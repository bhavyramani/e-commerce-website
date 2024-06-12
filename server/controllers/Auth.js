const { User } = require('../models/User');
const crypto = require('crypto');
const { sanitizeUser, sendMail } = require('../services/common');
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const { use } = require('passport');

exports.createUser = async (req, res) => {
    try {
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(
            req.body.password,
            salt,
            310000,
            32,
            'sha256',
            async function (err, hashedPassword) {
                const user = new User({ ...req.body, password: hashedPassword, salt });
                const doc = await user.save();

                req.login(sanitizeUser(doc), (err) => {
                    // this also calls serializer and adds to session
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        const token = jwt.sign(
                            sanitizeUser(doc),
                            SECRET_KEY
                        );
                        res
                            .cookie('jwt', token, {
                                expires: new Date(Date.now() + 3600000),
                                httpOnly: true,
                            })
                            .status(201)
                            .json({ id: doc.id, role: doc.role });
                    }
                });
            }
        );
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.loginUser = async (req, res) => {
    const user = req.user;
    res
        .cookie('jwt', req.user.token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
        })
        .status(201)
        .json(user);
};

exports.checkAuth = async (req, res) => {
    if (req.user)
        res.json(req.user);
    else
        res.status(401).json({ message: 'Unauthorized' });
};

exports.logout = async (req, res) => {
    res
        .cookie('jwt', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .sendStatus(200)
};

exports.resetPasswordRequest = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
        res.status(400).json({ message: "User Not Found" })
    }
    const token = crypto.randomBytes(48).toString('hex');
    user.resetPasswordToken = token;
    await user.save();
    const resetPageLink = "http://localhost:3000/reset-password?email=" + email + "&token=" + token;
    const subject = "Reset Password for E-Commerce";
    const html = `<p>Click <a href="${resetPageLink}">here</a> to reset your password</p>`
    if (email) {
        const data = await sendMail({ to: email, subject, html });
        res.status(200).json({ message: "Mail sent. Check your inbox" })
    } else {
        res.status(400).json({ message: "Email is required" })
    }
};

exports.resetPassword = async (req, res) => {
    const { email, password, token } = req.body;

    const user = await User.findOne({ email: email, resetPasswordToken: token });
    if (user) {
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(
            req.body.password,
            salt,
            310000,
            32,
            'sha256',
            async function (err, hashedPassword) {
                user.password = hashedPassword;
                user.salt = salt;
                await user.save();
                const subject = 'password successfully reset for e-commerce';
                const html = `<p>Successfully able to Reset Password</p>`;
                if (email) {
                    const response = await sendMail({ to: email, subject, html });
                    res.json(response);
                } else {
                    res.sendStatus(400);
                }
            }
        );
    } else {
        res.sendStatus(400);
    }
};
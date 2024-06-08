const passport = require('passport');
const nodemailer = require('nodemailer');

exports.isAuth = (req, res, done) => {
    return passport.authenticate('jwt');
}

exports.sanitizeUser = (user) => {
    return { id: user.id, role: user.role };
}

exports.cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    // Just for testing
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjQzYWYyMzU4ZjAwNjg4ZWE1MGJjMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE3ODQ2NjkyfQ.n3QJBSY5fvxICvEwf9RZXGDNoHXcZQgSKOLHSuYMoCA";
    return token;
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "ramanibhavy89@gmail.com",
        pass: process.env.MAIL_PASSWORD,
    },
});

exports.sendMail = async ({ to, subject, html }) => {
    const info = await transporter.sendMail({
        from: '"E-Commerce" <bhavy@ecommerce.com>', // sender address
        to,
        subject,
        html
    });
    return info;
};
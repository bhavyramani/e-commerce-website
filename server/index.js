const express = require('express');
const server = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const JwtStrategy = require('passport-jwt').Strategy;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { User } = require('./models/User');

const productRouter = require('./routes/Product');
const categoriesRouter = require('./routes/Category');
const brandRouter = require('./routes/Brand');
const userRouter = require('./routes/User');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');
const cors = require('cors');

const SECRET_KEY = 'SECRET_KEY';
const { isAuth, sanitizeUser, cookieExtractor } = require('./services/common');

let opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

server.use(express.static('build'));
server.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
}));
server.use(cookieParser());
server.use(passport.authenticate('session'));

server.use(cors({
    exposedHeaders: ['X-Total-Count']
}));

server.use(express.json());
server.use('/products', isAuth(), productRouter.router);
server.use('/categories', isAuth(), categoriesRouter.router);
server.use('/brands', isAuth(), brandRouter.router);
server.use('/users', isAuth(), userRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart', isAuth(), cartRouter.router);
server.use('/order', isAuth(), ordersRouter.router);

passport.use(
    'local',
    new LocalStrategy({ usernameField: 'email' }, async function (
        email,
        password,
        done
    ) {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: 'invalid credentials' }); // for safety
            }
            crypto.pbkdf2(
                password,
                user.salt,
                310000,
                32,
                'sha256',
                async function (err, hashedPassword) {
                    if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                        return done(null, false, { message: 'invalid credentials' });
                    }
                    const token = jwt.sign(
                        sanitizeUser(user),
                        SECRET_KEY
                    );
                    done(null, { token }); // this lines sends to serializer
                }
            );
        } catch (err) {
            done(err);
        }
    })
);

passport.use('jwt',
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, sanitizeUser(user));
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }

    }));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, { id: user.id, role: user.role });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/e-commerce');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}
main();

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(8080, () => {
    console.log("Server Started at http://localhost:8080");
});
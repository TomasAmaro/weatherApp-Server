const authController = {};
const passport = require('passport');
const config = require('../config');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

const jwtOptions = {
    secretOrKey: config.secret,
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(new jwtStrategy(jwtOptions, async (jwtPayload, done) => {
    User.findOne({'email': jwtPayload.email}, (err, user) => {
        if (err) {
            return done(err, null);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
}));

const serialize = passport.authenticate('jwt', {session: false});

authController.isAuthorized = serialize;

module.exports = authController;
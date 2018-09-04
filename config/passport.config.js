const config = require('../config');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user.model');

module.exports = function (passport) {
    const opts = {
        jwtFromRequest: extractJwt.fromHeader('Authorization'),
        secretOrKey: config.secret,
    };
    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({'email': jwt_payload.email}, (err, user) => {
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
  }
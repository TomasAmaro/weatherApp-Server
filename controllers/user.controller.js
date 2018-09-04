const userController = {};
const UserModel = require('../models/user.model');
const config = require('../config');
const jwt = require('jsonwebtoken');

userController.createUser = (req, res, next) => {
    UserModel.create(req.body, (err, user) => {
        if (err) {
            if(err.code === 11000) {
                res.status(409).send('User Already Exists');
            } else {
                res.status(500).send('Error');
            }
        } else {
            const token = jwt.sign({ email: user.email }, config.secret);
            res.status(200).send({ token: `bearer ${token}` }).json();
        }
    });
}

userController.logIn = (req, res, next) => {
    UserModel.findOne({ 'email': req.body.email }, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found' });
        } else {
            UserModel.comparePassword(req.body.password, user.password, (err, isMatch) => {
                if (isMatch && !err) {
                    const token = jwt.sign({ email: user.email }, config.secret);
                    res.status(200).send({ success: true, token: `bearer ${token}` });
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password' });
                }
            })
        }
    });
}

userController.getUserByMail = (req, res, next) => {
    UserModel.findOne({ 'email': req.query.email }, 'email dateCreated',
        (err, user) => {
            if (user) {
                res.status(200).send(user).json();
            } else {
                res.status(404).send('user not found');
            }
        });
}

module.exports = userController;
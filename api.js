const express = require('express');
const router = express.Router();
const passport = require('passport');

const weatherController = require('./controllers/weather.controller');
const userController = require('./controllers/user.controller');
const authController = require('./controllers/authentication.controller');

router.get('/', (req, res, next) => {
  console.log(process.env.WEATHER_API_KEY);
  res.status(200);
  res.send('all cool');
});

router.post('/user', [userController.createUser]);
router.post('/user/login', [userController.logIn]);
router.get('/user', [authController.isAuthorized, userController.getUserByMail]);
router.get('/weather/city', [authController.isAuthorized, weatherController.getWeatherByCity]);

module.exports = router;

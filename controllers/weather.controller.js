const weatherController = {};
const config = require('../config');
const superagent = require('superagent');

weatherController.getWeatherByCity = (req, res, next) => {
    superagent.get(config.weatherAPI)
    .query({
        q: req.query.location,
        units: req.query.units !== 'undefined' ? req.query.units : 'metric',
        APPID: config.weatherAPIKey,
    }).end((err, response) => {
        if (err) {
            res.status(500).send('We are having troubles in the main api');
        }
        const apiResponse = JSON.parse(response.text);
        const weatherCode = getWeatherCode(apiResponse.weather[0].id);
        const responseToSend = {
            location: apiResponse.name,
            generalInformation: apiResponse.main,
            wind: apiResponse.wind,
            description: apiResponse.weather[0].description,
            code: weatherCode,
        }
        res.status(200).send(responseToSend);
    })
}

function getWeatherCode(code) {
    if(code > 800) {
        return 9;
    } else {
        return Number(String(code).charAt(0));
    }
}

module.exports = weatherController;
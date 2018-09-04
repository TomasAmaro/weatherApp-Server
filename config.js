require('dotenv').config();

const config = {
    PORT: process.env.WEATHER_API_PORT || 3200,
    weatherAPIKey: process.env.WEATHER_API_KEY || '',
    weatherAPI: 'http://api.openweathermap.org/data/2.5/weather',
    dbPath: 'mongodb://localhost:3800/weatherApp',
    secret: 'notthatsecret', 
}

module.exports = config;
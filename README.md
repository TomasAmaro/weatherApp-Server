# WeatherApp Server

Simple Weather API Server with a facade from openweathermap api (https://openweathermap.org/api)

## Setup server

 1. Set configuration file in `/config.js`
 
    `const config = {`
    
    `PORT: process.env.WEATHER_API_PORT || 3200,`
    
    `weatherAPIKey: process.env.WEATHER_API_KEY || '',`
    
    `weatherAPI: 'http://api.openweathermap.org/data/2.5/weather',`
    
    `dbPath: 'mongodb://localhost:3800/weatherApp',`
    
    `secret: 'notthatsecret',`
    
    `}`
    
 2. Turn your super Mongo DB server up
 3. Run the `npm install`

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Further help

Feel free to contact me over github or the e-mail related to my account



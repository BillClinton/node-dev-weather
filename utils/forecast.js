const request = require('request');
const config = require('../config');

const forecast = (long, lat, callback) => {
  const weatherApiKey = config.weatherApiKey;
  const weatherUrl = `https://api.darksky.net/forecast/${weatherApiKey}/${long},${lat}`;

  request({ url: weatherUrl, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else if (response.body.error) {
      callback('Unable to retieve weather information');
    } else {
      const c = response.body.currently;
      const d = response.body.daily;
      const msg = `${d.data[0].summary}  It is currently ${c.temperature} degrees. There is a ${c.precipProbability}% chance of rain.`;
      callback(undefined, { msg });
    }
  });
};

module.exports = forecast;

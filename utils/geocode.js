const request = require('request');
const config = require('../config');

const geocode = (address, callback) => {
  const place = encodeURIComponent(address);
  const mapApiKey = config.mapApiKey;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${mapApiKey}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else if (response.body.features.length <= 0) {
      callback('Map service returned no data. Unable to find location.');
    } else {
      callback(undefined, {
        long: response.body.features[0].center[0],
        lat: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;

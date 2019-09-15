const request = require('request');

const config = require('./config');

const placeName = 'Philadelphia,Pa';
//const placeName = 'asdsadsa';

const mapApiKey = config.mapApiKey;
const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json?access_token=${mapApiKey}`;

request({ url: mapUrl, json: true }, (error, response) => {
  if (error) {
    console.log('unable to connect to map service');
  } else if (response.body.features.length <= 0) {
    console.log('Map service returned no data. Unable to find location.');
  } else {
    const long = response.body.features[0].center[0];
    const lat = response.body.features[0].center[1];

    console.log(long);
    console.log(lat);

    const weatherApiKey = config.weatherApiKey;
    const weatherUrl = `https://api.darksky.net/forecast/${weatherApiKey}/${long},${lat}`;

    request({ url: weatherUrl, json: true }, (error, response) => {
      if (error) {
        console.log('unable to connect to weather service');
      } else if (response.body.error) {
        console.log('Unable to retieve weather information');
      } else {
        const c = response.body.currently;
        const d = response.body.daily;
        const msg = `${d.data[0].summary}  It is currently ${c.temperature} degrees. There is a ${c.precipProbability}% chance of rain.`;

        console.log(msg);
      }
    });
  }
});

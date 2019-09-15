const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('Philadelphia', (error, geoData) => {
  if (error) {
    return console.log(error);
  }
  forecast(geoData.long, geoData.lat, (error, forecastData) => {
    if (error) {
      return console.log(error);
    }
    console.log(geoData.location);
    console.log(forecastData.msg);
  });
});

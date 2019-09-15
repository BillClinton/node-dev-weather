const yargs = require('yargs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Customize yargs version
yargs.version('1.0.0');

yargs.command({
  command: 'forecast',
  describe: "Get today's weater forecast from darksky.net",
  builder: {
    location: {
      describe: 'Location',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    geocode(argv.location, (error, geoData) => {
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
  }
});

yargs.parse();

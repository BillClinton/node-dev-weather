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
    geocode(argv.location, (error, { long, lat, location }) => {
      if (error) {
        return console.log(error);
      }
      forecast({ long, lat }, (error, { msg }) => {
        if (error) {
          return console.log(error);
        }
        console.log(location);
        console.log(msg);
      });
    });
  }
});

yargs.parse();

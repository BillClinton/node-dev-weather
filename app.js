const request = require('request');

const mapApiKey =
  'pk.eyJ1IjoiYmNsaW50b24iLCJhIjoiY2swazhpbjc0MGowOTNibzI2d25wMG4wZyJ9.CL4r9LkECXKFzEyJ2FkM_A';
const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${mapApiKey}`;

request({ url: mapUrl, json: true }, (error, response) => {
  console.log(response.body.features[0].center[0]);
  console.log(response.body.features[0].center[1]);
});

const weatherUrl =
  'https://api.darksky.net/forecast/14020ff4a5050ff1a644feb71cde65d7/40.122266,-75.083700';

request({ url: weatherUrl, json: true }, (error, response) => {
  const c = response.body.currently;
  const d = response.body.daily;
  const msg = `${d.data[0].summary}  It is currently ${c.temperature} degrees. There is a ${c.precipProbability}% chance of rain.`;

  console.log(msg);
});

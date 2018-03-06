const Particle = require('particle-api-js');
const secrets = require('./secrets.json');
const particle = new Particle();
(async () => {
  const accessToken = secrets.particleToken;
  const devices = await particle.listDevices({ auth: accessToken });
  const device = devices.body[0];
  try {
    const stream = await particle.getEventStream({ auth: accessToken, deviceId: device.id, name: 'soilValue' });
    stream.on('event', data => {
      console.log(data);
    });

  } catch (e) {
    console.error(e);
  }
})();
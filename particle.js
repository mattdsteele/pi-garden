const Particle = require("particle-api-js");

const getToken = () => {
  try {
    const secrets = require("./secrets.json");
    return secrets.particleToken;
  } catch (e) {
    return process.env.PARTICLE_TOKEN;
  }
};

const token = getToken();
const particle = new Particle();
(async () => {
  const accessToken = token;
  const devices = await particle.listDevices({ auth: accessToken });
  const device = devices.body[0];
  try {
    const stream = await particle.getEventStream({
      auth: accessToken,
      deviceId: device.id,
      name: "soilValue"
    });
    stream.on("event", data => {
      console.log(data);
    });
  } catch (e) {
    console.error(e);
  }
})();

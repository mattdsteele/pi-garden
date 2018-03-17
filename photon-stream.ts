const Particle = require("particle-api-js");
const getToken = () => {
  try {
    const secrets = require("./secrets.json");
    return secrets.particleToken;
  } catch (e) {
    return process.env.PARTICLE_TOKEN;
  }
};
import { Observable, Observer } from "rxjs";

interface ParticleEvent {
  data: string;
  published_at: string;
  name: string;
}

const particle = new Particle();
export const getEventStream = () => {
  const event$: Observable<ParticleEvent> = Observable.create(
    (obs: Observer<ParticleEvent>) => {
      const accessToken = getToken();
      particle
        .listDevices({ auth: accessToken })
        .then((devices: any) => {
          const device = devices.body[0];
          return particle.getEventStream({
            auth: accessToken,
            deviceId: device.id
          });
        })
        .then((stream: any) => {
          stream.on("event", (data: ParticleEvent) => {
            obs.next(data);
          });
        })
        .catch((e: any) => {
          obs.error(e);
        });
    }
  );
  return event$;
};

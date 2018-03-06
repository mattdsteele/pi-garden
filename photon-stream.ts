const Particle = require('particle-api-js');
const secrets = require('./secrets.json');
import { Observable, Observer } from 'rxjs';

interface ParticleEvent {
  data: string;
  published_at: string;
  name: string;
}

const particle = new Particle();
export const getEventStream = () => {
  const event$: Observable<ParticleEvent> = Observable.create((obs: Observer<ParticleEvent>) => {
    const accessToken = secrets.particleToken;
    particle.listDevices({ auth: accessToken }).then((devices: any) => {
      const device = devices.body[0];
      return particle.getEventStream({ auth: accessToken, deviceId: device.id });
    })
      .then((stream: any) => {
        stream.on('event', (data: ParticleEvent) => {
          obs.next(data);
        })
      })
      .catch((e: any) => {
        obs.error(e);
      })
  })
  return event$;
};
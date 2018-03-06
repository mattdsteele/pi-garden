import * as sensors from './sensors';
import { insert } from './db';

sensors.soil$.do(measurement => {
  console.log(`soil ${measurement.value}`);
  insert('soil', measurement.value);
}).subscribe();

sensors.humidity$.do(m => {
  console.log(`humidity ${m.value}`);
  insert('humidity', m.value);
})
  .subscribe();

sensors.temp$.do(m => {
  console.log(`temp ${m.value}`);
  insert('temp', m.value);
})
  .subscribe();
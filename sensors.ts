import { getEventStream } from './photon-stream';

const event$ = getEventStream();

const stream = (eventName: string) => {
  return event$.filter(d => d.name === eventName).map(d => {
    return {
      value: parseFloat(d.data),
      time: new Date(d.published_at)
    }
  }).bufferCount(5).map(vals => {
    return vals.reduce((prev, curr) => prev + curr.value, 0) / vals.length;
  }).map(value => {
    return {
      value,
      time: new Date()
    }
  })
}

export const soil$ = stream('soilMoisture');
export const temp$ = stream('temp');
export const humidity$ = stream('humidity');
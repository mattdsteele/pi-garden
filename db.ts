const secrets = require('./secrets.json');
import Influx = require('influx');

const db = new Influx.InfluxDB({
  host: secrets.influxHost,
  database: 'gardening',
  schema: [{
    measurement: 'sensor',
    fields: {
      value: Influx.FieldType.FLOAT
    },
    tags: ['type']
  }]
})

export const insert = async (sensorType: string, value: number) => {
  return db.writeMeasurement('sensor', [{
    fields: {
      value
    },
    tags: {
      type: sensorType
    }
  }])

}
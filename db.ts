import Influx = require("influx");

const getInfluxHost = () => {
  try {
    const secrets = require("./secrets.json");
    return secrets.influxHost;
  } catch (e) {
    return process.env.INFLUX_HOST;
  }
};

const db = new Influx.InfluxDB({
  host: getInfluxHost(),
  database: "gardening",
  schema: [
    {
      measurement: "sensor",
      fields: {
        value: Influx.FieldType.FLOAT
      },
      tags: ["type"]
    }
  ]
});

export const insert = async (sensorType: string, value: number) => {
  return db.writeMeasurement("sensor", [
    {
      fields: {
        value
      },
      tags: {
        type: sensorType
      }
    }
  ]);
};

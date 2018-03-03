const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const sleep = (sec: number) => {
  return new Promise(res => {
    setTimeout(res, sec * 1000);
  });
}

const sensor = async (path: string) => {
  try {
    const { stdout, stderr } = await exec(`cat ${path}`);
    const raw = stdout.trim();
    if (raw !== "0") {
      const number = parseInt(raw) / 1000.0;
      return number;
    }
  } catch (e) { }
};

const printReading = async (name: string, path: string) => {
  let prev = 0;
  while (true) {
    const newSensor = await sensor(path);
    if (newSensor && prev !== newSensor) {
      prev = newSensor;
      console.log(`new ${name}: ${newSensor}`);
    }
    await sleep(2);
  }
};
const SCAN_PATH = "/sys/bus/iio/devices/iio:device1";
const humidity = async () => {
  const SENSOR = 'in_humidityrelative_input';
  printReading('humidity', `${SCAN_PATH}/${SENSOR}`);
};
const temp = async () => {
  const SENSOR = 'in_temp_input';
  printReading('temp', `${SCAN_PATH}/${SENSOR}`);
};

(async () => {
  temp();
  humidity();
})();

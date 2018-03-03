const five = require('johnny-five');
const chip = require('chip-io');

const board = new five.Board({ io: new chip(), repl: false, debug: false });

let prev = 0;
board.on('ready', () => {
  const lradc = new five.Pin({ pin: 'LRADC', type: 'analog' });
  lradc.read((err, val) => {
    if (val !== prev) {
      console.log(val);
      prev = val;
    }
  });
});

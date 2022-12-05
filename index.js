((dayNum) => {
  const dayName = `day${dayNum}`;
  const utils = require('./lib/utils');
  const lines = utils.readFile(`${dayName}.txt`);
  
  const day = require(`./src/${dayName}`);
  const answer = day.run(lines, console);
  console.log(`answer: ${JSON.stringify(answer, null, 2)}`);
})(process.argv[2]);

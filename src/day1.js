const run = (lines, logger) => {
  const elves = {};
  const totals = [];
  let elfNum = 1;
  let maxCals = 0;

  const checkMaxCals = (elf) => {
    if (!elf) return;
    totals.push(elf.total);
    if (elf.total > maxCals) {
      maxCals = elf.total;
    }
  }

  lines.forEach(line => {
    if (line === '') {
      checkMaxCals(elves[elfNum]);
      elfNum++;
    }else {
      if (elves[elfNum] === undefined) {
        elves[elfNum] = {
          cals: [],
          total: 0,
        };
      }
      elves[elfNum].cals.push(line);
      elves[elfNum].total += parseInt(line);
    }
  });

  checkMaxCals(elves[elfNum]);
  logger.log(`Most valuable elf (MVE) has ${maxCals} calories.`);

  totals.sort((a, b) => parseInt(a) > parseInt(b) ? -1 : 1);

  const calSum = totals[0] + totals[1] + totals[2];
  logger.log(`top 3 elves total ${calSum} calories`);

  return {
    part1: maxCals,
    part2: calSum,
  }
}

module.exports = {
  run,
}
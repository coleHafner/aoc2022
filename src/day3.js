const getCompartments = (sack) => {
  const half = sack.length / 2;
  const first = sack.substring(0, half);
  const second = sack.substring(half);
  return [first, second];
}

const getCommonItem = (c1, c2) => {
  let commonItem = '';

  for (let i = 0, len = c1.length; i < len; ++i) {
    if (commonItem) break;
    const c1Item = c1[i];
    for (let j = 0, jLen = c2.length; j < jLen; ++j) {
      const c2Item = c2[j];
      if (c1Item === c2Item) {
        commonItem = c1Item;
        break;
      }
    }
  }

  if (!commonItem) {
    logger.error(`Could not find item in common between ${c1} and ${c2}`);
    return;
  }

  return commonItem;
}

const getItemPriority = (item) => {
  const isCaps = /[A-Z]/.test(item);
  const baseScore = item.toLowerCase().charCodeAt(0) & 31;
  return isCaps 
    ? baseScore + 26
    : baseScore;
}

const run = (lines, logger) => {
  let grandTotal = 0;

  lines.forEach(sack => {
    if (!sack) return;
    if (sack.length % 2 !== 0) {
      logger.error(`${sack} is not evenly divisible by two. Bailing.`);
      return;
    }

    const [c1, c2] = getCompartments(sack);
    const commonItem = getCommonItem(c1, c2);
    const score = getItemPriority(commonItem);
    grandTotal += score;
  });

  return {
    part1: grandTotal,
    part2: null,
  };
}

module.exports = {
  run,
  getCommonItem,
  getCompartments,
  getItemPriority,
}
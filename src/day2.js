const calcScore = (them, me, logger) => {
  const shapeScore = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };

  const outcomeScore = {
    win: 6,
    draw: 3,
    lose: 0,
  };

  const map = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
    X: 'rock',
    Y: 'paper',
    Z: 'scissors',
  };


  let outcome = 'lose';
  const theirPlay = map[them];
  const myPlay = map[me];

  if (!myPlay || !theirPlay) {
    throw new Error(`Could not resolve theirs: (${them} => ${theirPlay}) or mine: (${me} => ${myPlay})`);
  }

  if (
    (myPlay === 'rock' && theirPlay === 'scissors') ||
    (myPlay === 'paper' && theirPlay === 'rock') ||
    (myPlay === 'scissors' && theirPlay === 'paper')
  ) {
    outcome = 'win';
  } else if (myPlay === theirPlay) {
    outcome = 'draw';
  }

  logger.debug(`${myPlay} <> ${theirPlay} = ${outcome}`);
  const actual = shapeScore[myPlay] + outcomeScore[outcome];

  // now according to what I was supposed to do...
  const cheatMap = {
    X: 'lose',
    Y: 'draw',
    Z: 'win',
  };

  const cheatOutcome = cheatMap[me];
  if (outcome === cheatOutcome) {
    return actual;
  }

  // draw
  let myCheatPlay = '';

  switch (cheatOutcome) {
    case 'win':
      if (theirPlay === 'rock') {
        myCheatPlay = 'paper';
      } else if (theirPlay === 'paper') {
        myCheatPlay = 'scissors';
      } else if (theirPlay === 'scissors') {
        myCheatPlay = 'rock';
      }
      break;

    case 'lose':
      if (theirPlay === 'rock') {
        myCheatPlay = 'scissors';
      } else if (theirPlay === 'paper') {
        myCheatPlay = 'rock';
      } else if (theirPlay === 'scissors') {
        myCheatPlay = 'paper';
      }
      break;
    case 'draw':
      myCheatPlay = theirPlay;
      break;
  }

  return outcomeScore[cheatOutcome] + shapeScore[myCheatPlay];
}

const run = (lines, logger) => {
  let totalScore = 0;
  // console.log(`lines: ${JSON.stringify(lines, null, 2)}`);

  let totalRounds = 0;
  const plannedOutcomes = {
    X: 0,
    Y: 0,
    Z: 0,
  };

  lines.forEach(line => {
    if (!line) return;
    const [them, me] = line.split(' ');
    plannedOutcomes[me]++;
    totalScore += calcScore(them, me, logger);
    totalRounds++;
  });

  logger.log(`totalScore: ${totalScore} in ${totalRounds} rounds. Planned outcomes: ${JSON.stringify(plannedOutcomes, null, 2)}`);
  return {
    part1: totalScore,
    part2: plannedOutcomes,
  };
}

module.exports = {
  run,
  calcScore,
}

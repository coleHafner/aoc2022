const day3 = require('../src/day3');

describe('day3', () => {
  test.each([
    ['a', 1],
    ['z', 26],
    ['A', 27],
    ['Z', 52],
  ])('getItemPriority() - item %p should have %p priority', (input, expected) => {
    const actual = day3.getItemPriority(input);
    expect(actual).toEqual(expected);
  });

  test.each([
    ['abcdefgh', ['abcd', 'efgh']],
  ])('getCompartments() - sack containing %p should be split into %p compartments', (input, expected) => {
    const [c1Actual, c2Actual] = day3.getCompartments(input);
    const [c1Expected, c2Expected] = expected;
    expect(c1Actual).toEqual(c1Expected);
    expect(c2Actual).toEqual(c2Expected);
  });

  test.each([
    [['abcdX', 'efghX'], 'X']
  ])('getCommonItem() - sack with %p compartments should have %p as common item', (input, expected) => {
    const [c1, c2] = input;
    const actual = day3.getCommonItem(c1, c2);
    expect(actual).toEqual(expected);
  })
})
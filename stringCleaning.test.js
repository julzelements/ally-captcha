const { hasInts } = require('./stringCleaning');

test('should detect integers in "1234"', () => {
  expect(hasInts("1, 2")).toBe(3);
});
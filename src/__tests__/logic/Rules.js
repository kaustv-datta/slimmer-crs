import * as Rules from '../../logic/Rules';

it('determines pledge for vehicle & membership types', () => {
  expect(Rules.pledgeValue('gold', 'L')).toEqual(0);
  expect(Rules.pledgeValue('gold', 'S')).toEqual(0);
  expect(Rules.pledgeValue('regular', 'L')).toEqual(100);
  expect(Rules.pledgeValue('regular', 'S')).toEqual(300);
});

it('calculates final amount to be paid (regular)', () => {
  expect(
    Math.round(Rules.calculateFinalAmountDue('regular', 17, 0, 0, 'M', 'M1')),
  ).toEqual(Math.round(160.65));
});

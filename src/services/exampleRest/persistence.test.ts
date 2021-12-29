import { getAllExampleItems } from './persistence';
import { EXAMPLE_RESULTS } from './constants';

describe('services :: exampleRest :: persistence', () => {
  describe('unit :: #getAllExampleItems', () => {
    it('gets all example items', () => {
      const results = getAllExampleItems();
      expect(results).toEqual(EXAMPLE_RESULTS);
    });
  });
});

import { main } from './main';

describe('index.ts', () => {
  test('should be callable', () => {
    expect(() => main()).not.toThrow();
  });
});

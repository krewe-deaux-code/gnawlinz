import { describe, expect, it } from 'vitest';
//import { Enemy } from '../src/client/App';
import { isEnemy } from '../src/client/utility/gameUtils';

describe('#isEnemy', () => {
  const input1 = {health: 1, strength: 10};
  const input2 = {strength: 1};
  it('returns ...', () => {
    expect(isEnemy(input1) as boolean).toBe(true);
  });
  it('returns a string in all cases', () => {
    expect(isEnemy(input2) as boolean).toBe(false);
  });
  it('returns a string in all cases', () => {
    expect(typeof isEnemy(input2)).toBe('object');
  });
});



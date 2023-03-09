import { describe, expect, it } from 'vitest';
import { Enemy } from '../src/client/App';
import { statCheck, fightEnemy, isEnemy } from '../src/client/utility/gameUtils';

describe('#statCheck', () => {

  const input = Math.floor(Math.random() * 10) + 1;

  it('should always return "success" if the input is greater than 10', () => {
    expect(statCheck(11) as string).toBe('success');
  });

  it('should always return "failure" if the input is less than 1', () => {
    expect(statCheck(0) as string).toBe('failure');
  });

  it('should always return a string', () => {
    expect(typeof statCheck(input)).toBe('string');
  });

});

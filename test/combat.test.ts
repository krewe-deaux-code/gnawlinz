import { describe, expect, it } from 'vitest';
import { Enemy } from '../src/client/App';
import { statCheck, fightEnemy, isEnemy } from '../src/client/utility/gameUtils';


describe('#fightEnemy', () => {
  it('should return an object', ()=> {
    expect( typeof fightEnemy(5, 100, 7, 10)as string).toBe('object');
  });
  it('returned object should have a player or enemy property', ()=> {
    expect(fightEnemy(5, 100, 7, 10)as object).toHaveProperty('enemy');
  });
  it('returned object should have a player or enemy property', ()=> {
    expect(fightEnemy(7, 100, 5, 10)as object).toHaveProperty('player');
  });
});

//export const fightEnemy = (enemyStrength: number, enemyHealth: number, playerStrength: number, playerHealth: number) => {



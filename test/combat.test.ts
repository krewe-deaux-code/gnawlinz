import { statCheck, fightEnemy, isEnemy } from '../src/client/utility/gameUtils';
import handleLocationChange from '../src/client/components/gameView/GameView';
import { describe, expect, it } from 'vitest';
import { Enemy } from '../src/client/App';
import axios from 'axios';

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

describe('#fightEnemy', () => {
  it('should return an object', () => {
    expect(typeof fightEnemy(5, 100, 7, 10) as string).toBe('object');
  });
  it('returned object should have a player or enemy property', () => {
    expect(fightEnemy(4, 100, 7, 10) as object).toHaveProperty('enemy');
  });
  it('returned object should have a player or enemy property', () => {
    expect(fightEnemy(7, 100, 4, 10) as object).toHaveProperty('player');
  });
});


describe('#damageApplication', () => {
  // const damage = fightEnemy(7, 100, 4, 10); // returns ~8
  let playerHealth = 0;
  axios.patch('/character/update/1', { health: fightEnemy(7, 100, 4, 10).player })
    .then(() => {
      axios.get('/character/1')
        .then((response) => {
          playerHealth += response.data.health;
        })
        .catch((err => console.log('err in damage calc tests line 29: ', err)));
    })
    .catch((err => console.log('err in damage calc tests line 31: ', err)));
  // playerHealth should be 4-9
  it('should provide a new health total to be saved in the DB', () => {
    expect(playerHealth).toBeLessThan(10);
  });
});



//export const fightEnemy = (enemyStrength: number, enemyHealth: number, playerStrength: number, playerHealth: number) => {

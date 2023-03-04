import { Enemy } from '../App';

export const statCheck = (stat: number) => {
  const npcRoll = Math.floor(Math.random() * 10) + 1;
  const weight = 1;
  console.log('INSIDE statCheck Func', stat, npcRoll);
  if (stat > npcRoll * weight) {
    return 'success';
  } else {
    return 'failure';
  }
};

export const fightEnemy = (enemyStrength: number, enemyHealth: number, playerStrength: number, playerHealth: number) => {
  console.log('ENEMY STRENGTH', enemyStrength);
  console.log('PLAYER STRENGTH', playerStrength);
  if (enemyStrength > playerStrength) {
    const dmg = enemyStrength - playerStrength;
    return { player: (playerHealth - dmg) };
  } else if (playerStrength > enemyStrength) {
    const dmg = playerStrength - enemyStrength;
    return { enemy: (enemyHealth - dmg) };
  } else { // <-- tie
    return { player: (playerHealth - 1) };
  }
};

export const isEnemy = (obj: any): obj is Enemy => {
  return 'strength' in obj && 'health' in obj;
};

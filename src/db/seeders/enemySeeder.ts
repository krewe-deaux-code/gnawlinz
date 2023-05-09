import Enemy from '../schemas/enemy';
import { EnemyDBType } from './seedData/enemySeed';
const enemySeeder = async (enemyArr: EnemyDBType[]) => {
  // Iterate over the enemies in the input array
  for (let i = 0; i < enemyArr.length; i++) {
    // Create a new Enemy instance with the data from the JSON file
    await Enemy.findOrCreate(
      {
        where: {
          name: enemyArr[i].name,
          image_url: enemyArr[i].image_url,
          weapon1: enemyArr[i].weapon1,
          strength: enemyArr[i].strength,
          health: enemyArr[i].health,
          score: enemyArr[i].score,
          initial_text: enemyArr[i].initial_text,
          victory: enemyArr[i].victory,
          defeat: enemyArr[i].defeat
        }
      })
      .then(() =>
        console.log('Enemy.findOrCreate successful: '))
      .catch((err) =>
        console.error('Error Enemy.findOrCreate error in src/db/seeders/enemySeeder.ts: ', err));
  }
};

export default enemySeeder;

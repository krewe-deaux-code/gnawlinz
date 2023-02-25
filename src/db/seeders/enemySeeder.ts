import Enemy from '../schemas/enemy';
const enemySeeder = async (enemyArr: any) => {
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
          health: enemyArr[i].health
        }
      })
      .then((success) =>
        console.log('Enemy.findOrCreate successful: '))
      .catch((err) =>
        console.error('Error Enemy.findOrCreate error in src/db/seeders/enemySeeder.ts: '));
  }
};

export default enemySeeder;

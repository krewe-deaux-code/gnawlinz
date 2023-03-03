import Boss from '../schemas/boss';

const bossSeeder = async (bossArr: any) => {
  for (let i = 0; i < bossArr.length; i++) {
    await Boss.findOrCreate({
      where: {
        name: bossArr[i].name,
        image_url: bossArr[i].image_url,
        weapon1: bossArr[i].weapon1,
        health: bossArr[i].health,
        strength: bossArr[i].strength,
        location: bossArr[i].location,
      }
    })
      .then(() =>
        console.log('Boss.findOrCreate successful: '))
      .catch((err) =>
        console.error('Error Boss.findOrCreate error in src/db/seeders/characterSeeder.ts: ', err));
  }
};

export default bossSeeder;

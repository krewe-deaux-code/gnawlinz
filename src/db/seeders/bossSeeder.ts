import Boss from '../schemas/boss';
import { BossDBType } from './seedData/bossSeed';

const bossSeeder = async (bossArr: BossDBType[]) => {
  for (let i = 0; i < bossArr.length; i++) {
    await Boss.findOrCreate({
      where: {
        name: bossArr[i].name,
        image_url: bossArr[i].image_url,
        weapon1: bossArr[i].weapon1,
        health: bossArr[i].health,
        strength: bossArr[i].strength,
        location: bossArr[i].location,
        score: bossArr[i].score,
        event: bossArr[i].event,
        victory: bossArr[i].victory,
        defeat: bossArr[i].defeat,
        contact: bossArr[i].contact,
      }
    })
      .then(() =>
        console.log('Boss.findOrCreate successful: '))
      .catch((err) =>
        console.error('Error Boss.findOrCreate error in src/db/seeders/bossSeeder.ts: ', err));
  }
};

export default bossSeeder;

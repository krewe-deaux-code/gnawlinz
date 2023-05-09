import Ally from '../schemas/ally';
import { AllyDBType } from './seedData/allySeed';

const allySeeder = async (allyArr: AllyDBType[]) => {
  for (let i = 0; i < allyArr.length; i++) {
    await Ally.findOrCreate(
      {
        where: {
          name: allyArr[i].name,
          image_url: allyArr[i].image_url,
          strength: allyArr[i].strength,
          endurance: allyArr[i].endurance,
          alignment: allyArr[i].alignment,
          greeting: allyArr[i].greeting,
          departing: allyArr[i].departing
        }
      })
      .then(() =>
        console.log('Ally.findOrCreate successful: '))
      .catch((err) =>
        console.error('Error Ally.findOrCreate error in src/db/seeders/allySeeder.ts: ', err));
  }
};

export default allySeeder;

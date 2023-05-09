import Icon from '../schemas/gameAssets/icon';
import { IconDBType } from './seedData/iconSeed';
const iconSeeder = async (iconArr: IconDBType[]) => {
  // Iterate over the icons in the JSON file
  for (let i = 0; i < iconArr.length; i++) {
    // Create a new icon instance with the data from the JSON file
    await Icon.findOrCreate(
      {
        where: {
          name: iconArr[i].name,
          image_url: iconArr[i].image_url
        }
      })
      .then(() =>
        console.log('Icon.findOrCreate successful: '))
      .catch((err) =>
        console.error('Error Icon.findOrCreate error in src/db/seeders/iconSeeder.ts: ', err));

  }
};

export default iconSeeder;

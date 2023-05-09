import Character from '../schemas/character';
import { CharacterDBType } from './seedData/characterSeed';

const characterSeeder = async (characterArr: CharacterDBType[]) => {
  for (let i = 0; i < characterArr.length; i++) {
    await Character.findOrCreate({
      where: {
        handle_id: characterArr[i].handle_id,
        name: characterArr[i].name,
        image_url: characterArr[i].image_url,
        inventory: characterArr[i].inventory,
        health: characterArr[i].health,
        strength: characterArr[i].strength,
        endurance: characterArr[i].endurance,
        mood: characterArr[i].mood,
        location: characterArr[i].location,
        ally_count: characterArr[i].ally_count
      }
    })
      .then(() =>
        console.log('Character.findOrCreate successful: '))
      .catch((err) =>
        console.error('Error character.findOrCreate error in src/db/seeders/characterSeeder.ts: ', err));
  }
};

export default characterSeeder;

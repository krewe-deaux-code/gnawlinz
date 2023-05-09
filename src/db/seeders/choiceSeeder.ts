import Choice from '../schemas/choice';
import { ChoiceDBType } from './seedData/choiceSeed';
const choiceSeeder = async (choiceArr: ChoiceDBType[]) => {
  // Iterate over the enemies in the input array
  for (let i = 0; i < choiceArr.length; i++) {
    // Create a new Enemy instance with the data from the JSON file
    await Choice.findOrCreate(
      {
        where: {
          flavor_text: choiceArr[i].flavor_text,
          success: choiceArr[i].success,
          failure: choiceArr[i].failure,
          alignment0: choiceArr[i].alignment0,
          alignment1: choiceArr[i].alignment1,
          alignment2: choiceArr[i].alignment2
        }
      })
      .then(() =>
        console.log('Choice.findOrCreate successful: '))
      .catch((err) =>
        console.error('Error Choice.findOrCreate error in src/db/seeders/choiceSeeder.ts: ', err));
  }
};

export default choiceSeeder;

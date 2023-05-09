import Story from '../schemas/story';
import { StoryDBType } from './seedData/storySeed';
const storySeeder = async (storyArr: StoryDBType[]) => {
  // Iterate over the enemies in the input array
  for (let i = 0; i < storyArr.length; i++) {
    // Create a new Enemy instance with the data from the JSON file
    await Story.findOrCreate(
      {
        where: {
          character_id: storyArr[i].character_id,
          char_choices: storyArr[i].char_choices
        }
      })
      .then(() =>
        console.log('Story.findOrCreate successful: '))
      .catch((err) =>
        console.error('Error Story.findOrCreate error in src/db/seeders/storySeeder.ts: ', err));
  }
};

export default storySeeder;

import Story from '../schemas/story';
const storySeeder = async (storyArr: any) => {
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
      .then((success) =>
        console.log('Story.findOrCreate successful: '))
      .catch((err) =>
        console.error('Error Story.findOrCreate error in src/db/seeders/storySeeder.ts: '));
  }
};

export default storySeeder;

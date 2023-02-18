import Choice from '../schemas/choice';
const choiceSeeder = async (choiceArr: any) => {
  // Iterate over the enemies in the input array
  for (let i = 0; i < choiceArr.length; i++) {
    // Create a new Enemy instance with the data from the JSON file
    await Choice.findOrCreate(
      {
     where: {
      flavor_text0: choiceArr[i].flavor_text0,
      flavor_text1: choiceArr[i].flavor_text1,
      alignment0: choiceArr[i].alignment0,
      alignment1: choiceArr[i].alignment1,
      alignment2: choiceArr[i].alignment2,
      enemy_effect: choiceArr[i].enemy_effect,
      ally_effect: choiceArr[i].ally_effect,
      item_effect: choiceArr[i].item_effect,
     }
    })
    .then((success) =>
    console.log('Choice.findOrCreate successful: ', success))
    .catch((err) =>
    console.error('Error Choice.findOrCreate error in src/db/seeders/choiceSeeder.ts: ', err))
  }
}

export default choiceSeeder;

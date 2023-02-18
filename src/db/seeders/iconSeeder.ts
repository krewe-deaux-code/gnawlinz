//import iconsData from '../seederObjects/icons.json';
import Icon from '../schemas/gameAssets/icon';
const iconSeeder = async (iconArr) => {
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
    .then((success) =>
    console.log('Icon.findOrCreate successful: ', success))
    .catch((err) =>
    console.error('Error Icon.findOrCreate error in src/db/seeferFunctions/iconSeeder.ts: ', err))
  }
}

export default iconSeeder;
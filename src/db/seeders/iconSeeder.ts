//import iconsData from '../seederObjects/icons.json';
import Icon from '../schemas/gameAssets/icon';

// const iconsData = [
//   {
//     "name": "heartIcon",
//     "imageUrl": "https://res.cloudinary.com/de0mhjdfg/image/upload/v1676589660/gnawlinzIcons/noun-heart-pixel-red-2651784_c3mfl8.png"
//   }
// ];

const iconSeeder = async () => {
  // Iterate over the icons in the JSON file
  const iconsData = [
    {
      "name": "heartIcon",
      "imageUrl": "https://res.cloudinary.com/de0mhjdfg/image/upload/v1676589660/gnawlinzIcons/noun-heart-pixel-red-2651784_c3mfl8.png"
    }
  ];
  for (let i = 0; i < iconsData.length; i++) {
    // Create a new icon instance with the data from the JSON file
    await Icon.findOrCreate(
      {
     where: {
      name: iconsData[i].name,
      imageUrl: iconsData[i].imageUrl
     }
    })
    .then((success) =>
    console.log('Icon.findOrCreate successful: ', success))
    .catch((err) => 
    console.error('Error Icon.findOrCreate error in src/db/seeferFunctions/iconSeeder.ts: ', err))
  }
}

export default iconSeeder;
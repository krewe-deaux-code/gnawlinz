//import iconsData from '../seederObjects/icons.json';
import Location from '../schemas/location';
const locationSeeder = async (locationArr: any) => {
  // Iterate over the icons in the JSON file
  for (let i = 0; i < locationArr.length; i++) {
    // Create a new icon instance with the data from the JSON file
    await Location.findOrCreate(
      {
        where: {
          name: locationArr[i].name,
          image_url: locationArr[i].image_url,
          random_item_spot1: locationArr[i].random_item_spot1,
          random_item_spot2: locationArr[i].random_item_spot2,
          drop_item_slot: locationArr[i].drop_item_slot,
          graffiti: locationArr[i].graffiti,
          graffiti_msgs: locationArr[i].graffiti_msgs
        }
      })
      .then((success) =>
        console.log('Location.findOrCreate successful: '))
      .catch((err) =>
        console.error('Error Location.findOrCreate error in src/db/seeder/locationSeeder.ts: '));
  }
};

export default locationSeeder;

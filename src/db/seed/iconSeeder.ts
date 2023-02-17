//import iconsData from '../seederObjects/icons.json';
import Icon from './icon';

const iconSeeder = () => {
  // Iterate over the icons in the JSON file
  const iconsData = [
    {
      "name": "heartIcon",
      "imageUrl": "https://res.cloudinary.com/de0mhjdfg/image/upload/v1676589660/gnawlinzIcons/noun-heart-pixel-red-2651784_c3mfl8.png"
    }
  ];
  for (let i = 0; i < iconsData.length; i++) {
    // Create a new icon instance with the data from the JSON file
    Icon.create({
      name: iconsData[i].name,
      imageUrl: iconsData[i].imageUrl
    });
  }
}

export default iconSeeder;
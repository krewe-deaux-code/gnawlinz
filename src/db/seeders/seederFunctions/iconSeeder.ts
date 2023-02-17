const iconsData = require('./icons.json');
const Icon  = require ('../../schemas/gameAssets/icons.ts');


async function iconSeeder() {
  try {
    // Iterate over the icons in the JSON file
    for (const iconData of iconsData.icons) {
      // Create a new icon instance with the data from the JSON file
      const icon = await Icon.create({
        name: iconData.name,
        imageUrl: iconData.imageUrl
      });
    }

    console.log('icons seeded successfully');
  } catch (err) {
    console.error('Error seeding icons:', err);
  }
}

iconSeeder();
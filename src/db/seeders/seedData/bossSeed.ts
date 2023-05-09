export type BossDBType = {
  [key: string]: number | string;
};

export const bossSeed = [
  {
    name: 'Nicolas Un-Caged',
    image_url: 'https://res.cloudinary.com/de0mhjdfg/image/upload/v1680290130/GnawlinzEnemies/NicolasUnCagedFinal_f2smu4.png',
    weapon1: 'Kukri',
    strength: 5,
    health: 500,
    location: 6, // Math.floor(Math.random() * 4) + 1
    score: 666,
    event: 4,
    victory: 'You defeated Nick Un-Caged!',
    defeat: 'With a sickening squelch, Nick-Uncaged buries his huge kukri knife in your chest.',
    contact: 'You try to reason with the creature that used to be Academy Award Winning ACtor Nicholas Cage, but he just growls back something about taking your face off. '
  },
  // {
  //   name: 'Bananasaurus',
  //   image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/357.png',
  //   weapon1: 'Banana Bunch',
  //   strength: 3,
  //   health: 20,
  //   location: 1
  // },
  // {
  //   name: 'Literally a Gundam',
  //   image_url: 'https://media.graphassets.com/LmSp40GcTiWNTPsv2Gd9',
  //   weapon1: 'Beam Rifle',
  //   strength: 4,
  //   health: 100,
  //   location: 2
  // }
];

import images from '../../../client/utility/images';

export type EnemyDBType = {
  [key: string]: string | number;
};

export const enemySeed = [
  {
    name: 'Banana-Zombie',
    image_url: images.bananaZombie,
    weapon1: 'Tenta-peel',
    strength: 1,
    health: 2,
    score: 13,
    initial_text: 'You\'ve come across a creature that makes you question your sanity. It seems to be an undead banana-peel. Tall as a man, with vacant eyes and bared teeth, it moves like an octopus out of water. It is a thing that should not be.',
    victory: 'You defeated the banana zombie, and left behind a gross discolored peel for someone to slip on later.',
    defeat: 'The banana zombie consumed you, and added your biomass to its own.',
    contact: 'It slides grotesquely toward you, gritting its bared teeth. It responds to you only with a low growl and violence.',
  },
  {
    name: 'F-35 Lightning II',
    image_url: 'https://res.cloudinary.com/de0mhjdfg/image/upload/v1680753760/GnawlinzEnemies/highplane_l0bmto.png',
    weapon1: 'Air-to-Ground Missile',
    strength: 7,
    health: 10,
    score: 107,
    initial_text: 'You stand you ground and are engaged by a Lockheed Martin F-35 Lightning II.',
    victory: 'You managed to bring down a hostile aircraft! It crashed to the ground in a burning heap.',
    defeat: 'You stood no chance of defeating a high tech aircraft purpose built for war. You were slain by a precision missile strike.',
    contact: 'The object comes into view, a military aircraft of some kind. It does not respond to your attempted communication, instead flying off into the distance.'
  },
  {
    name: 'Bill Zombergh',
    image_url: 'https://res.cloudinary.com/de0mhjdfg/image/upload/v1680334309/GnawlinzEnemies/BillZombergh_rs7otp.png',
    weapon1: 'TPS Report',
    strength: 5,
    health: 5,
    score: 20,
    initial_text: 'A zombie who was clearly once an office worker shambles toward you. His hoarse moans sound like he wants you to come in on Saturdays.',
    victory: 'You do NOT work on Saturdays.',
    defeat: 'Bill Zomberg delivers a fatally infectious bite. You\'re doomed to an eternity of zombie middle-management.',
    contact: ''
  },
  {
    name: 'Baby Cakes',
    image_url: 'https://res.cloudinary.com/de0mhjdfg/image/upload/v1680203640/GnawlinzEnemies/BabyCakes_pzqzlf.png',
    weapon1: 'Rotten King Cake',
    strength: 5,
    health: 5,
    score: 20,
    initial_text: 'You see a horrifying amalgamation of man, machine, and BABY vaulting towards you!',
    victory: 'Baby Cakes\' purple, green, and gold entrails spill out onto the pavement.',
    defeat: 'You hear a ear piercing wail: "GOO GOO GAGA!" as your vision fades to black.',
    contact: ''
  },
  {
    name: 'Drunken Shambler',
    image_url: 'https://res.cloudinary.com/de0mhjdfg/image/upload/v1680224365/GnawlinzEnemies/DrunkenShamblerFinal_folgdz.png',
    weapon1: 'Broken Bottle',
    strength: 5,
    health: 5,
    score: 20,
    initial_text: 'Wobbling towards you is a walking corpse, smelling of death, booze, and regret. Zombie or tourist it matters not.',
    victory: 'You swear you hear it say, "I bet I can tell you where you got your shoes" as you stomp on its head.',
    defeat: 'The creature vomits a one-hundred and ninety proof corrosive substance dissolving you into Bourbon Street juice.',
    contact: ''
  },
  {
    name: 'Zombie-Gator',
    image_url: images.zombieGator,
    weapon1: 'Noxious Bite',
    strength: 5,
    health: 5,
    score: 20,
    initial_text: 'Sliding toward you on a layer of gross ooze is a colossal undead alligator!',
    victory: 'You slew the rotting reptile, and left the carcass',
    defeat: 'With a final sickening snap of its jaws, the undead gator swallows you whole.',
    contact: ''
  },
];

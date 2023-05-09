export type ChoiceDBType = {
  [key: string]: string | null;
};

export const choiceSeed = [
  { // fight jet 1 (keeping for the memories) 1
    flavor_text: 'You stand your ground and are engaged by a Lockheed Martin F-35 Lightning II.',
    success: 'You managed to bring down a hostile aircraft! It crashed to the ground in a burning heap.',
    failure: 'You stood no chance of defeating a high tech aircraft purpose built for war. You were slain immediately by a precision missile strike.',
    alignment0: null,
    alignment1: null,
    alignment2: null,
  },
  { // Generic Fight Text 2
    flavor_text: 'You stand your ground and fight!',
    success: 'You defeated the banana zombie, and left behind a gross green peel for someone to slip on later.',
    failure: 'The banana zomibe consumed you, and added your biomass to its own.',
    alignment0: null,
    alignment1: null,
    alignment2: null,
  },
  { // Generic Talk Text 3
    flavor_text: 'You wave your hand to get the attention of the flying object.',
    success: 'The object slows and hovers above you, revealing itself as a Lockheed Martin F-35 Lightning II. The pilot responds by opening up the canopy of his vehicle and tossing out a care package of supplies! Wordlessly, he reseals the cockpit and flies off into the distance. You know it was the C variant due to it\'s hover capabilities, and that it is a variant deployed almost exclusively by the US Marine Corps.',
    failure: 'The pilot of the aircraft did not respond to your attempted communication, and the craft screamed off into the distance.',
    alignment0: null,
    alignment1: null,
    alignment2: null,
  },
  { // talk to ZB 4 (kill) 4
    flavor_text: 'You attempt to make contact with the entity.',
    success: 'You met with another survivor, and they shared an item with you!',
    failure: 'Your voice echoed in the dark and got no answer.',
    alignment0: null,
    alignment1: null,
    alignment2: null,
  },
  { // Generic Stealth 5
    flavor_text: 'You decide to sneak through the area, attempting to collect supplies while avoiding contact with the entity.',
    success: 'Some sort of aircraft streaks through the sky just overhead, seemingly having not detected your presence.',
    failure: 'You attempt to stick to the shadows, but the advanced detections systems of the F-35 Lightning II easily tracked you!',
    alignment0: null,
    alignment1: null,
    alignment2: null,
  },
  { // pass ZB stealth 6
    flavor_text: 'You attempt to explore the area without disturbing the entity.',
    success: 'You wisely avoid contact with the nightmare entity that resembles an animate, zombified banana peel with a disturbing human face. You\'ll see that thing behind your eyelids till the day you die.',
    failure: 'The Banana-Zombie spotted you! It grinds its teeth and slithers towards you with unnatural speed!',
    alignment0: null,
    alignment1: null,
    alignment2: null,
  },
  { // Flee 7
    flavor_text: 'You wordlessly turn and sprint away from the area. Whatever you might find here is not worth a potentially deadly fight.',
    success: null,
    failure: null,
    alignment0: null,
    alignment1: null,
    alignment2: null,
  },
  { // Hide and Rest 8
    flavor_text: 'You go inside, and find an abandoned space. This is a good spot to catch your breath and take stock of your situation.',
    success: 'You closed and barricaded the door once you had looked around long enough to be sure you were alone. You rested for a while in an abandoned building and got your strength back.',
    failure: 'You found the building was teeming with the undead, and had no choice but to move on.',
    alignment0: null,
    alignment1: null,
    alignment2: null,
  },
  { // Search for survivors 9
    flavor_text: 'You cautiously enter the space and call out for survivors.',
    success: 'You heard the response of a living person! You met another survivor who shared an item with you.',
    failure: 'Your voice echoed in the dark and got no answer.',
    alignment0: null,
    alignment1: null,
    alignment2: null,
  },
  { // Search for supplies 10
    flavor_text: 'You cautiously enter the space and search it for anything of use.',
    success: 'The space seemed like it had been picked mostly clean, but you did find one item worth taking with you.', //'You scavenged abandoned spaces, once full of people and music, and gathered what few resources remained.',
    failure: 'The space had been picked clean, and you found nothing but refuse.',
    alignment0: null,
    alignment1: null,
    alignment2: null,
  }
];


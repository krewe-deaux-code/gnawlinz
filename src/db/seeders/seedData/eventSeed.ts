/**
 * when adding new events, please follow the template of the existing events:
 * initial text: what the user will see upon drawing that event
 * choice0: choice_id, // engage: fight or otherwise confront the subject of the event
 * choice1: choice_id, // evade: attempt stealth to proceed through area without detection
 * choice2: choice_id, // evacuate: flee the scene to a new location
 * choice3: choice_id, // wildcard: an option that seems random or eccentric
 * enemy_effect: boolean, // can an enemy be spawned on engage or failed evade
 * ally_effect: boolean, // can an ally be received from this event
 * item_effect: boolean, //can an item be received from this event (currently always true)
 * */

export const eventSeed = [
  {
    initial_text: 'You turn a corner, and hear the loudest sound you\'ve ever heard. In you peripheral vision you catch a glimpse of a huge dark shape roaring through the air toward you!',
    choice0: 1, // fight the shadow
    choice1: 5, // attempt stealth
    choice2: 7, // flee the scene
    choice3: 3, // attempt contact
    enemy_effect: true,
    ally_effect: false,
    item_effect: true,
  },
  {
    initial_text: 'You\'ve come across a creature that makes you question your sanity. It seems to be an undead banana-peel. Tall as a man, with vacant eyes and bared teeth, it moves like an octopus out of water. It is a thing that should not be.',
    choice0: 2, // fight the zombie
    choice1: 6, // attempt stealth
    choice2: 7, // flee the scene
    choice3: 4, // attempt contact
    enemy_effect: true,
    ally_effect: false,
    item_effect: true,
  },
  {
    initial_text: 'You find an unlocked door! You can\'t see inside from where you are, and you don\'t hear anything moving around inside.',
    choice1: 10, // Search the building for supplies
    choice3: 8, // Barricade yourself inside
    choice2: 7, // flee the scene
    choice0: 9, // Search the building for survivors
    enemy_effect: false,
    ally_effect: true,
    item_effect: true,
  }
];

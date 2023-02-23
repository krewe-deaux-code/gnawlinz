/**
 * when adding new events, please follow the template of the existing events:
 * initial text: what the user will see upon drawing that event 
 * choice0: choice_id, // engage: fight or otherwise confront the subject of the event
 * choice1: choice_id, // evade: attempt stealth to proceed through area without detection
 * choice2: choice_id, // evacuate: flee the scene to a new location
 * choice3: choice_id, // wildcard: an option that seems random or eccentric
 * */ 

export const eventSeed = [
  {
    initial_text: "You turn a corner, and hear the loudest sound you've ever heard. In you peripheral vision you catch a glimpse of a huge dark shape roaring through the air toward you!  What do you do?",
    choice0: 1, // engage: fight the shadow
    choice1: 5, // evade: attempt stealth
    choice2: 7, // evacuate: flee the scene
    choice3: 3, // wildcard: attempt contact
  },
  {
    initial_text: "You've come across a creature that makes you question your sanity. It seems to be an undead banana-peel. Tall as a man, with vacant eyes and bared teeth, it moves like a octopus out of water. It is a thing that should not be.",
    choice0: 2, // engage: fight the zombie
    choice1: 6, // evade: attempt stealth
    choice2: 7, // evacuate: flee the scene
    choice3: 4, // wildcard: attempt contact
  },
  {
    initial_text: "You find an unlocked door! You can't see inside from where you are, and you don't hear anything moving around inside.",
    choice0: 10, // engage: Search the building for supplies
    choice1: 8, // evade: Barricade yourself inside
    choice2: 7, // evacuate: flee the scene
    choice3: 9, // wildcard: Search the building for survivors
  }
]
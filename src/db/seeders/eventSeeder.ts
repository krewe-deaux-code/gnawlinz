import Event from '../schemas/event';
import { EventDBType } from './seedData/eventSeed';
const eventSeeder = async (eventArr: EventDBType[]) => {
  // Iterate over events in the input array
  for (let i = 0; i < eventArr.length; i++) {
    await Event.findOrCreate({
      where: {
        initial_text: eventArr[i].initial_text,
        choice0: eventArr[i].choice0,
        choice1: eventArr[i].choice1,
        choice2: eventArr[i].choice2,
        choice3: eventArr[i].choice3,
        enemy_effect: eventArr[i].enemy_effect,
        ally_effect: eventArr[i].ally_effect,
        item_effect: eventArr[i].item_effect,
      }
    })
      .then((success)=>
        console.log('Event.findOrCreate successful: ', success))
      .catch((err) =>
        console.error('Error Event.findOrCreate error in src/db/seeders/eventSeeder.ts: ', err));
  }
};

export default eventSeeder;

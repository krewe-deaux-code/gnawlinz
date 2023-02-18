import Character from '../schemas/character';

const characterSeeder = async (characterArr: any) => {
  for (let i = 0; i < characterArr.length; i++) {
    await Character.findOrCreate({
     where:   {
      handle_id: characterArr[i].handle_id,
      name: characterArr[i].name,
      image_url: characterArr[i].image_url,
      slot0: characterArr[i].slot0,
      slot1: characterArr[i].slot1,
      slot2: characterArr[i].slot2,
      slot3: characterArr[i].slot3,
      slot4: characterArr[i].slot4,
      slot5: characterArr[i].slot5,
      slot6: characterArr[i].slot6,
      slot7: characterArr[i].slot7,
      health: characterArr[i].health,
      strength: characterArr[i].strength,
      endurance: characterArr[i].endurance,
      mood: characterArr[i].mood,
      location: characterArr[i].location,
      ally_count: characterArr[i].ally_count
    }
  })
    .then((success) =>
    console.log('Character.findOrCreate successful: ', success))
    .catch((err) =>
    console.error('Error character.findOrCreate error in src/db/seeders/characterSeeder.ts: ', err))
  }
}

export default characterSeeder;

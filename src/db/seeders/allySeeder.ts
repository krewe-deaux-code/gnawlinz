import Ally from '../schemas/ally';

const allySeeder = async (allyArr: any) => {
  for (let i = 0; i < allyArr.length; i++) {
    await Ally.findOrCreate(
      {
     where: {
      name: allyArr[i].name,
      image_url: allyArr[i].image,
      strength: allyArr[i].strength,
      endurance: allyArr[i].endurance,
      alignment: allyArr[i].alignment
     }
    })
    .then((success) =>
    console.log('Ally.findOrCreate successful: ', success))
    .catch((err) =>
    console.error('Error Ally.findOrCreate error in src/db/seeders/allySeeder.ts: ', err))
  }
}

export default allySeeder;

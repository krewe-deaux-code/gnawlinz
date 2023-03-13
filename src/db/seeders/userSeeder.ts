import User from '../schemas/user';

const userSeeder = async (userArr: any) => {
  for (let i = 0; i < userArr.length; i++) {
    await User.findOrCreate(
      {
        where: {
          google_id: userArr[i].google_id,
          google_avatar: userArr[i].google_avatar,
          name: userArr[i].name,
        }
      })
      .then((success) =>
        console.log('User.findOrCreate successful!'))
      .catch((err) =>
        console.error('Error Ally.findOrCreate error in src/db/seeders/allySeeder.ts: '));
  }
};

export default userSeeder;

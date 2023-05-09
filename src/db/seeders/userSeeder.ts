import User from '../schemas/user';
import { UserDBType } from './seedData/userSeed';

const userSeeder = async (userArr: UserDBType[]) => {
  for (let i = 0; i < userArr.length; i++) {
    await User.findOrCreate(
      {
        where: {
          google_id: userArr[i].google_id,
          google_avatar: userArr[i].google_avatar,
          name: userArr[i].name,
        }
      })
      .then(() =>
        console.log('User.findOrCreate successful!'))
      .catch((err) =>
        console.error('Error User.findOrCreate error in src/db/seeders/userSeeder.ts: ', err));
  }
};

export default userSeeder;

import Item from '../schemas/item';
import { ItemDBType } from './seedData/itemSeed';

const itemSeeder = async (itemArr: ItemDBType[]) => {
  for (let i = 0; i < itemArr.length; i++) {
    await Item.findOrCreate(
      {
        where: {
          name: itemArr[i].name,
          image_url: itemArr[i].image_url,
          consumable: itemArr[i].consumable,
          modified_stat0: itemArr[i].modified_stat0,
          modified_stat1: itemArr[i].modified_stat1,
          modifier0: itemArr[i].modifier0,
          modifier1: itemArr[i].modifier1,
          buy_price: itemArr[i].buy_price,
          sell_price: itemArr[i].sell_price
        }
      })
      .then(() =>
        console.log('Item.findOrCreate successful: '))
      .catch((err) =>
        console.error('Error Item.findOrCreate error in src/db/seeders/itemSeeder.ts: ', err));
  }
};

export default itemSeeder;

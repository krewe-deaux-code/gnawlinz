import { describe, it, expect } from 'vitest';
import axios from 'axios';

describe('#getItem Banana', () => {

  const banana = {
    _id: 2,
    name: 'Banana',
    image_url: 'https://res.cloudinary.com/de0mhjdfg/image/upload/v1676744463/gnawlinzItems/184060007_oirkki.webp',
    consumable: true,
    modified_stat0: 'health',
    modified_stat1: null,
    modifier0: 2,
    modifier1: null,
    buy_price: 2,
    sell_price: 1
  };
  const itemCheck = axios.get('item/2')
    .then((res) => res.data)
    .catch((err) => console.error('failed to get Banana', err));
  it('should return item Banana', () => {
    expect(itemCheck as any).toEqual(Promise.resolve(banana)
      .catch((err) => {
        console.error('failed to get Banana', err);
      }));
  });

});
describe('#getItem Lead Pipe', () => {
  const leadPipe = {
    _id: 3,
    name: 'Lead Pipe',
    image_url: 'https://res.cloudinary.com/de0mhjdfg/image/upload/v1676744593/gnawlinzItems/Lead_Pipe_n8qx3x.webp',
    consumable: false,
    modified_stat0: 'strength',
    modified_stat1: null,
    modifier0: 3,
    modifier1: null,
    buy_price: 5,
    sell_price: 2
  };


  const itemCheck2 = axios.get('item/3')
    .then((res) => res.data)
    .catch((err) => console.error('failed to get Lead Pipe', err));
  it('should return item Lead Pipe', () => {
    expect(itemCheck2 as any).toEqual(Promise.resolve(leadPipe)
      .catch((err) => {
        console.error('failed to get Banana', err);
      }));
  });
});

// describe('#damageApplication', () => {
//   // const damage = fightEnemy(7, 100, 4, 10); // returns ~8
//   let playerHealth = 0;
//   axios.patch('/character/update/1', { health: fightEnemy(7, 100, 4, 10).player })
//     .then(() => {
//       axios.get('/character/1')
//         .then((response) => {
//           playerHealth += response.data.health;
//         })
//         .catch((err => console.log('err in damage calc tests line 29: ', err)));
//     })
//     .catch((err => console.log('err in damage calc tests line 31: ', err)));
//   // playerHealth should be 4-9
//   it('should provide a new health total to be saved in the DB', () => {
//     expect(playerHealth).toBeLessThan(10);
//   });
// });

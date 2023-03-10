import { describe, it, expect } from 'vitest';
import '../src/db/index';
import { getItem } from '../src/server/dbRoutes/item';
// const { currentChar } = useContext(UserContext);


describe('#getItem Banana', () => {
  const req = {
    params: {
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
    }
  };

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
  const itemCheck = getItem(req);
  it('should return item Banana', () => {
    expect(itemCheck as any).toEqual(Promise.resolve(banana)
      .catch((err) => {
        console.error('failed to get Banana', err);
      }));
  });

});
describe('#getItem Lead Pipe', () => {
  const req2 = {
    params: {
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
    }
  };
  const leadPipe = {
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

  const itemCheck2 = getItem(req2);
  it('should return item Lead Pipe', () => {
    expect(itemCheck2 as any).toEqual(Promise.resolve(leadPipe)
      .catch((err) => {
        console.error('failed to get Lead Pipe', err);
      }));
  });
});

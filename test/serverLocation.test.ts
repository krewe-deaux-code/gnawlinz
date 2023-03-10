import { describe, expect, it } from 'vitest';
import axios from 'axios';


describe('#updateDropItem', () => {
  it('should update the drop item in the location table', async () => {
    axios.patch('/location/update/2', { drop_item_slot: 1 })
      .then(() => {
        axios.get('/location/2')
          .then((location) => {
            expect(location.data.drop_item_slot).toBe(1);
          })
          .catch((err) => {
            console.log('failed to get updated drop item slot', err);
          });
      })
      .catch((err) => {
        console.log('failed to update the drop item slot', err);
      });
  });
});

describe('#updateGraffiti', () => {
  it('should update the graffiti message in the location table', async () => {
    axios.patch('/location/update/2', { graffiti_msg: 'Hello' })
      .then(() => {
        axios.get('/location/2')
          .then((location) => {
            expect(location.data.graffiti_msg).toBe('Hello');
          })
          .catch((err) => {
            console.log('failed to get the correct message from location', err);
          });
      })
      .catch((err) => {
        console.log('failed to update the message in location', err);
      });
  });
});


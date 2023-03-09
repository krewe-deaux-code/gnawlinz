import { describe, expect, it } from 'vitest';
import axios from 'axios';


describe('#updateDropItem', () => {
  it('should update the drop item in the location table', async () => {
    axios.patch('/location/update/2', { drop_item_slot: 1 })
      .then(() => {
        axios.get('/location/2')
          .then((location) => {
            expect(location.data.drop_item_slot).toBe(1);
          });
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
          });
      });
  });
});


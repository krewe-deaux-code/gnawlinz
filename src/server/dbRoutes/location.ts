// import express from 'express';
import express, { Router, Request, Response } from 'express';

const locationRouter = Router();

interface LocationUpdateRequest extends Request {
  body: {
    drop_item_slot: number;
  };
}


// <-- Unsure if we need these -->
import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->

import Location from '../../db/schemas/location';

// <-- middleware -->

locationRouter.use(express.json());
locationRouter.use(express.urlencoded({ extended: true }));



// ******************
// *** DB Queries ***
// ******************





locationRouter.get('/random', (req, res) => {
  Location.findOne({ order: Sequelize.literal('RANDOM()'), limit: 1 })
    .then((location) => {
      console.log('LOCATION RANDOM FOUND', location);
      res.status(201).send(location);
    })
    .catch((err) => {
      console.error('Error from Location.findall /location/random: ', err);
    });
});

locationRouter.put('/:_id', async (req: LocationUpdateRequest, res: Response) => {
  try {
    const {_id} = req.params;
    const {drop_item_slot} = req.body;

    // Find the location by _id and update the drop_item_slot
    const [rowsUpdated, [updatedLocation]] = await Location.update(
      { drop_item_slot: drop_item_slot },
      { where: { _id: _id }, returning: true },
    );

    if (rowsUpdated > 0) {
      res.status(200).send(updatedLocation);
    } else {
      res.status(404).send(`Location ${_id} not found`);
    }
  } catch (err) {
    console.error('Error in locationRouter.put--src/server/dbRoutes/location.ts', err);
    res.status(500).send('Server error');
  }
});
export default locationRouter;

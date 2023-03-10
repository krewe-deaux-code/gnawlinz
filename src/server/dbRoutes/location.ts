// import express from 'express';
import { Router, Request, Response } from 'express';

const locationRouter = Router();



// <-- Unsure if we need these -->
import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->

import Location from '../../db/schemas/location';

// <-- middleware -->

// locationRouter.use(express.json());
// locationRouter.use(express.urlencoded({ extended: true }));



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

locationRouter.get('/allLocations', (req, res) => {
  Location.findAll({ order: Sequelize.literal('RANDOM()') })
    .then((locations) => {
      console.log('ALL LOCATIONS FOUND', locations);
      res.status(200).send(locations);
    })
    .catch((err) => {
      console.error('Error from /location/allLocations: ', err);
    });
});

//gets a single location by _id
locationRouter.get('/:_id', async (req: Request, res: Response) => {
  Location.findOne({ where: { _id: req.params._id } })
    .then((location) =>
      res.status(200).send(location))
    .catch((err) => {
      console.error('Error in locationRouter.get endpoint /:_id--src/server/dbRoutes/location.ts', err);
      res.status(500).send('Server error');
    });
});


// update any number of fields on a single location in the db
locationRouter.patch('/update/:_id', (req, res) => {
  //console.log(req.body);
  Location.update(req.body, { where: { _id: req.params._id } })
    .then((response) => {
      console.log('RESPONSE LOCATION UPDATE', response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.error(`Error Location.update @Location/update/${req.params._id}`, err);
    });
});



export default locationRouter;

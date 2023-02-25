// import express from 'express';
import { Router } from 'express';

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
  Location.findAll({ order: Sequelize.literal('RANDOM()')})
    .then((locations) => {
      console.log('ALL LOCATIONS FOUND', locations);
      res.status(201).send(locations);
    })
    .catch((err) => {
      console.error('Error from /location/allLocations: ', err);
    });
});

export default locationRouter;

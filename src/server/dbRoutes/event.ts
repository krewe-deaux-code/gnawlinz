import express from 'express';
import { Router } from 'express';

const eventRouter = Router();

// <-- Unsure if we need these -->
import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
import Event from '../../db/schemas/event';

// <-- middleware -->
eventRouter.use(express.json());
eventRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************

eventRouter.get('/random', (req, res) => {
  Event.findOne({ order: Sequelize.literal('RANDOM()'), limit: 1 })
    .then((event) => {
      console.log('EVENT RANDOM FOUND', event);
      res.status(200).send(event)
    })
    .catch((err) => {
      console.error('Error from Event.findOne /event/random: ', err);
    });
});

export default eventRouter;

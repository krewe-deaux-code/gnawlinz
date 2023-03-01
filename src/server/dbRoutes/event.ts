// import express from 'express';
import { Router } from 'express';

const eventRouter = Router();

// <-- Unsure if we need these -->
import { Sequelize, Op } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
import Event from '../../db/schemas/event';

// <-- middleware -->
// eventRouter.use(express.json());
// eventRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************

eventRouter.get('/random', (req, res) => {
  console.log('REQ PARAMS NULL???', req.query.excludeEventId);
  const excludeEventId = req.query.excludeEventId; // to get from sent params
  const where = excludeEventId ? { _id: { [Op.ne]: excludeEventId } } : {}; // Operator Not Equal...
  Event.findOne({ where, order: Sequelize.literal('RANDOM()'), limit: 1 })
    .then((event) => {
      // console.log('EVENT RANDOM FOUND', event);
      res.status(200).send(event);
    })
    .catch((err) => {
      console.error('Error from Event.findOne /event/random: ', err);
    });
});

export default eventRouter;

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

// create random number 'next' while next === excludeId reassign 'next' else query
eventRouter.get('/random', (req, res) => {
  // console.log('REQ PARAMS NULL???', req.query.excludeEventId);
  const excludeEventId = req.query.excludeEventId; // to get from sent params
  let next = Math.floor(Math.random() * 3) + 1; // hardcoded to prevent LAST event record query
  while (next.toString() === excludeEventId) {
    next = Math.floor(Math.random() * 3) + 1;
  }
  // const where = excludeEventId ? { _id: { [Op.ne]: excludeEventId } } : {}; // Operator Not Equal...
  Event.findOne({ where: { _id: next} })
    .then((event) => {
      // console.log('EVENT RANDOM FOUND', event);
      res.status(200).send(event);
    })
    .catch((err) => {
      console.error('Error from Event.findOne /event/random: ', err);
    });
});

eventRouter.get('/:id', (req, res) => {
  // console.log('REQ PARAMS NULL???', req.query.excludeEventId);
  // const excludeEventId = req.query.excludeEventId; // to get from sent params
  // const where = excludeEventId ? { _id: { [Op.ne]: excludeEventId } } : {}; // Operator Not Equal...
  Event.findOne({ where: { _id: req.params.id }})
    .then((event) => {
      // console.log('EVENT RANDOM FOUND', event);
      res.status(200).send(event);
    })
    .catch((err) => {
      console.error('Error from Event.findOne /event/random: ', err);
    });
});

export default eventRouter;

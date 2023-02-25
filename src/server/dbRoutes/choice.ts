// import express from 'express';
import { Router } from 'express';

const choiceRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
import Choice from '../../db/schemas/choice';

// <-- middleware -->
// choiceRouter.use(express.json());
// choiceRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************
choiceRouter.get('/selected/:index', (req, res) => {
  const { index } = req.params;
  Choice.findOne({ where: {
    _id: index
  }})
    .then(choiceObj => {
      res.status(200).send(choiceObj);
    })
    .catch(err => {
      console.error('Failed to findOne Choice', err);
      res.sendStatus(500);
    });
});

export default choiceRouter;

// import express from 'express';
import { Router } from 'express';

const itemRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
import Item from '../../db/schemas/item';

// <-- middleware -->
// itemRouter.use(express.json());
// itemRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************
itemRouter.get('/:_id', (req, res) => {
  Item.findOne({
    where: { _id: req.params._id }
  })
    .then(item =>
      res.status(200).send(item)
    )
    .catch(err => {
      console.error('Error in src/server/dbRoutes/item.ts itemRouter: ', err);
      res.sendStatus(500);
    });
});

export default itemRouter;

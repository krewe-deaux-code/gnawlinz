import express from 'express';
import { Router } from 'express';

const iconRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
//import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
import Icon from '../../db/schemas/gameAssets/icon';

// <-- middleware -->
iconRouter.use(express.json());
iconRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************
const getAllIcons = async () => {
  try {
    const data = await Icon.findAll();
    return data;
  } catch (err) {
    return console.log('Error in src/server/dbRoutes/icons.ts function--getAllIcons: ', err);
  }
};


iconRouter.get('/', (req, res) => {
  getAllIcons()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error('Error in src/server/dbRoutes/icons.ts method--iconRouter.get: ', err);
      res.sendStatus(500);
    });
});



export default iconRouter;

// import express from 'express';
import { Router } from 'express';

// <-- DB Model -->
import Enemy from '../../db/schemas/enemy';

const enemyRouter = Router();

// ******************
// *** DB Queries ***
// ******************

enemyRouter.get('/:id', (req, res)=>{
  Enemy.findOne({where: {_id: req.params.id}})
    .then((response: any) => {
      //console.log(response.dataValues);
      res.status(200).send(response.dataValues);
    })
    .catch((err) => {
      console.log('get enemy ERROR: ', err);
      res.sendStatus(500);
    });
});

export default enemyRouter;

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';

// <-- middleware -->
// enemyRouter.use(express.json());
// enemyRouter.use(express.urlencoded({ extended: true }));

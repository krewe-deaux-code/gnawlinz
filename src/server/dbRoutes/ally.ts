// import express from 'express';
import { Router } from 'express';
// <-- DB Model -->
import Ally from '../../db/schemas/ally';

const allyRouter = Router();

// ******************
// *** DB Queries ***
// ******************

allyRouter.get('/:_id', (req, res) => {
  Ally.findOne({
    where: {
      _id: req.params._id
    }
  })
    .then((ally) =>{
      res.status(200).send(ally?.dataValues);
    })
    .catch((err) =>{
      console.error('Get Ally Failure: ', err);
      res.sendStatus(500);
    });
});


export default allyRouter;

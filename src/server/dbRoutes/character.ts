import express from 'express';
import { Router } from 'express';

const characterRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
import Character from '../../db/schemas/character';

// <-- middleware -->
characterRouter.use(express.json());
characterRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************
characterRouter.get('/:_id', (req, res) => {
  const { _id } = req.params;
  console.log('_id in Character Router.get : ', _id);
  Character.findOne({
    where: {
      _id: _id
    }
  })
    .then((character) => {
    console.log('This is character in Character.findOne', character);
    res.status(200).send(character)
  })
    .catch((err) => {
    console.error('Error Character.findOne failed - src/db/dbRoutes/character.ts: ', err);
    res.sendStatus(500);
  });
});

characterRouter.get('/user/:google_id', (req, res) => {
  const { google_id } = req.params;
  Character.findAll({
    where: {
      handle_id: google_id // <-- THIS NEEDS TO BE ADDED EACH TIME CHAR CREATED -->
    }
  })
  .then((characters) => {
    res.status(201).send(characters);
  })
  .catch((err) => {
    console.error('Error Character.findAll google_id', err);
  });
});

export default characterRouter;

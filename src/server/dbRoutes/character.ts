// import express from 'express';
import { Router } from 'express';

const characterRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
import Character from '../../db/schemas/character';

// <-- middleware -->
// characterRouter.use(express.json());
// characterRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************
//get a single character based on the character's id
characterRouter.get('/:_id', (req, res) => {
  const { _id } = req.params;
  // console.log('_id in Character Router.get : ', _id);
  Character.findOne({
    where: {
      _id: _id
    }
  })
    .then((character) => {
      // console.log('This is character in Character.findOne', character);
      res.status(200).send(character);
    })
    .catch((err) => {
      console.error('Error Character.findOne failed - src/server/dbRoutes/character.ts: ', err);
      res.sendStatus(500);
    });
});

//get all the characters for a given user
characterRouter.get('/user/:google_id', (req, res) => { // look up Sequelize order
  const { google_id } = req.params;
  Character.findAll({
    where: {
      handle_id: google_id // <-- THIS NEEDS TO BE ADDED EACH TIME CHAR CREATED -->
    },
    order: [['_id', 'ASC']]
  })
    .then((characters) => { // sort order of characters for currChar to be first
      res.status(201).send(characters);
    })
    .catch((err) => {
      console.error('Error Character.findAll google_id', err);
    });
});


characterRouter.patch('/update/:char_id', (req, res) => {
  //console.log(req.body);
  Character.update(req.body, { where: { _id: req.params.char_id } })
    .then((response) => {
      console.log('RESPONSE CHAR UPDATE', response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.error(`Error Character.update @character/stats/${req.params.char_id}`, err);
    });
});

export default characterRouter;

// import express from 'express';
import { Router } from 'express';

const characterRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
import Character from '../../db/schemas/character';
import User from '../../db/schemas/user';

// <-- middleware -->
// characterRouter.use(express.json());
// characterRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************

//create a new character entry in the DB
characterRouter.post('/newCharacter', (req, res) => {
  Character.create(req.body.newCharacter)
    .then((newChar) => {
      console.log(newChar);
      res.status(201).send(newChar);
    })
    .catch((err) => {
      console.error('Character Creation FAILURE: ', err);
    });
});

// get a single character based on the character's id
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

// get all the characters for a given user
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

// get all the characters from the DB ordered by score
characterRouter.get('/characters/getall', (req, res) => {
  Character.findAll({
    order: [['score', 'DESC']]
  })
    .then((allChars) => {
      res.status(200).send(allChars);
    })
    .catch((err) => {
      console.error('Error getting all characters: ', err);
    });
});

// get all the characters from the DB, joined with the User that created them
characterRouter.get('/characters/allWithUsers', (req, res) => {
  Character.findAll({
    include: [{ model: User }],
    order: [['score', 'DESC']]
  })
    .then((allChars) => {
      res.status(200).send(allChars);
    })
    .catch((err) => {
      console.error('Error getting all characters: ', err);
    });
});

// update any number of fields on a single character in the db
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

// axios get current char inventory
characterRouter.get('/inventory/get', (req, res) => {
  Character.findOne({ where: { _id: req.query.charID } })
    .then((character: any) => {
      console.log('SUCCESS INVENTORY GET', character);
      // get items on current char
      // below is if you need to send JUST the inventory
      // const inventory = character.inventory;
      res.status(200).send(character);
    })
    .catch(err => console.error('FAIL GET INVENTORY', err));
});

// axios post in gameView upon obtain item
characterRouter.patch('/inventory/patch', (req, res) => {
  Character.findOne({ where: { character_id: req.body.charID } })
    .then((character: any) => {
      const newItem = req.body.itemID;
      // grab array and push new items into it
      character.inventory.push(newItem);
      console.log('SUCCESS INVENTORY', character);
      Character.update({ inventory: character.inventory }, {
        where: { character_id: req.body.charID }
      })
        .then((rowsUpdated: any) => { res.status(200).send(rowsUpdated); })
        .catch(err => console.error('Character UPDATE failed after inventory PUSH', err));
    })
    .catch((err) => console.error('ERROR INVENTORY', err));
});

//
characterRouter.delete('/inventory/delete', (req, res) => {
  Character.findOne({ where: { _id: req.body.charID } })
    .then((character: any) => {
      // console.log('LOOKING FOR ITEM TO DELETE', character);
      const remItem = character.inventory.indexOf(req.body.itemID);
      character.inventory[remItem] = 1;
      console.log('LOOKING FOR ITEM TO DELETE', character.inventory);
      Character.update({ inventory: character.inventory }, {
        where: { _id: req.body.charID }
      })
        .then((rowsUpdated: any) => {
          console.log('ITEM DELETED???', rowsUpdated);
          res.status(200).send(rowsUpdated);
        })
        .catch(err => console.error('Character UPDATE failed after inventory PUSH', err));
    })
    .catch(err => console.error('', err));
});

export default characterRouter;

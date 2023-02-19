import express from 'express';
import { Router } from 'express';

const storyRouter = Router();

// <-- Unsure if we need these -->

//import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
import Story from '../../db/schemas/story';

// <-- middleware -->
storyRouter.use(express.json());
storyRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************

storyRouter.get('/ending/:charID', (req, res) => {
  Story.findOne({ where: { character_id: req.params.charID }})
  .then((response) => {
    console.log('story object retrieved from db: ', response);
    res.status(200).send(response);
  })
  .catch((err) => {
    console.error(err, 'server failed to retrieve story from DB');
  })
})

export default storyRouter;

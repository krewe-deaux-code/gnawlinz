import express from 'express';
import { Router } from 'express';
//import { TEXT } from 'sequelize';
import Choice from '../../db/schemas/choice';

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
  Story.findOne({ where: { character_id: req.params.charID } })
    .then((storyResponse: any) => {
      console.log('story object retrieved from db: ', storyResponse);
      //build ending text to return in .send()
      let storyArr: Number[] = storyResponse.char_choices;
      console.log('choices array: ', storyArr);
      let choiceArr: any = storyArr.map((choiceId: Number) => {
         return Choice.findOne({where:{_id: choiceId}})
      })
      console.log('Choices Text Array: ', choiceArr);
      // for (let i = 0; i < storyResponse.char_choices.length; i++) {
      //   Choice.findOne({ where: { _id: storyResponse.char_choices[i] } })
      //     .then((choiceResponse: any) => {
      //       if (choiceResponse) {
      //         storyArr.push(choiceResponse.flavor_text0)
      //       }
      //     })
      //     .catch((err) => console.error('choiceGrab.failHard: ', err))
      // }
      res.status(200).send(storyArr); //return array
    })
    .catch((err) => {
      console.error(err, 'server failed to retrieve story from DB');
    })
})

export default storyRouter;

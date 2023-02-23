import express from 'express';
import { Router } from 'express';
//import { TEXT } from 'sequelize';
//import Choice from '../../db/schemas/choice';
//import { Op } from 'sequelize';


const storyRouter = Router();

// <-- Unsure if we need these -->


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
    .then((storyResponse: any) =>{
      console.log('story object retrieved from db: ', storyResponse);
      let choiceArr = storyResponse.char_choices; 
      res.status(200).send(choiceArr);
    })  
  })

storyRouter.post('/ending/:charID', (req, res) => {
  Story.findOrCreate({ where: { character_id: req.params.charID } })
    .then((storyResponse: any) =>{
      console.log('story object retrieved from db: ', storyResponse);
      let choiceArr = storyResponse.char_choices; 
      res.status(200).send(choiceArr);
    })  
})
  export default storyRouter;

  
  // const getStory: Function = async (id: Number) => {
  //   let story = await Story.findOne({ where: { character_id: id } })
  //     .then((storyResponse: any) => storyResponse)
  //     console.log('story object retrieved from db: ', story);
  //   const choices = await Choice.findAll({
  //     where: {
  //       _id: { [Op.in]: story.char_choices }
  //     }
  //   });
  //   let choiceArr: String[] = choices.map((choice: any) => choice.)
  //   res.status(200).send(choiceArr);
  // }
  // getStory(req.params.charID);  


  // for (let i = 0; i < storyResponse.char_choices.length; i++) {
  //   Choice.findOne({ where: { _id: storyResponse.char_choices[i] } })
  //     .then((choiceResponse: any) => {
  //       if (choiceResponse) {
  //         storyArr.push(choiceResponse.flavor_text0)
  //       }
  //     })
  //     .catch((err) => console.error('choiceGrab.failHard: ', err))
  // }

      // let choiceArr: any[] = [];
      // const choiceGrab = async (choiceId: Number) => {
      //   await Choice.findOne({where:{_id: choiceId}})
      //   .then((choice: any) => {
      //     console.log('choice object retrieved from db: ', choice);
          
      //     choiceArr.push(choice)
      //   })
      // }
      // for(let i = 0; i < storyArr.length; i++){
      //   choiceArr.push(choiceGrab(storyArr[i]));
      // }

      // console.log('log to appease TS: ', choiceGrab)
      // console.log('Choices Text Array: ', choiceArr);

//       const choiceIds = story.char_choices; // assuming story.char_choices is an array of choice IDs
// const choices = await Choice.findAll({
//   where: {
//     _id: { [Sequelize.Op.in]: choiceIds }
//   }
// });

// for(let i = 0; i < story.char_choices.length; i++){
//   await Choice.findOne({ where: { _id: story.char_choices[i]}})
//     .then((choice: any) => { console.log(choice.flavor_text1); choiceArr[i] = choice.flavor_text1 })
//     .catch((err) => console.error('choiceGrab.failHard: ', err))
//     console.log(choiceArr);
// }


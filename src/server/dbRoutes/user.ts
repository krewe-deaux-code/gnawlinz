import express from 'express';
import { Router } from 'express';





const userRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
//import User from '../../db/schemas/user';

// <-- middleware -->
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************


// userRouter.get('/find', (req, res) => {
//   //console.log('************************************/user endpoint hit');
//   console.log('********************',req)
//   User.findAll({
//       limit: 1,
//       order: [['updatedAt', 'DESC']]

//       }).then((user) => {
//           console.log('USER?', user);
//           res.send(user);
//       }).catch((err) => {
//         console.log(err);
//         })

// });

export default userRouter;

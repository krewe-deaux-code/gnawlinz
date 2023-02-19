import express from 'express';
import { Router } from 'express';





const userRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
import User from '../../db/schemas/user';

// <-- middleware -->
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************


userRouter.get('/find/:sessionID', (req, res) => {
  const {sessionID} = req.params;
  User.findOne({
      where: {
        session_id: sessionID
      }
      }).then((user) => {
          console.log('USER?', user);
          res.status(200).send(user);
      }).catch((err) => {
        console.log(err);
        })
});

export default userRouter;

// import express from 'express';
import { Router } from 'express';





const userRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
import User from '../../db/schemas/user';

// <-- middleware -->
// userRouter.use(express.json());
// userRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************

// get a user by session ID
userRouter.get('/find/:sessionID', (req, res) => {
  const { sessionID } = req.params;
  User.findOne({
    where: {
      session_id: sessionID
    }
  }).then((user) => {
    // console.log('USER?', user);
    res.status(200).send(user);
  }).catch((err) => {
    console.log(err);
  });
});

// get a user by user ID
userRouter.get('/get/:id', (req, res) => {
  const { id } = req.params;
  User.findOne({
    where: {
      user_id: id
    }
  }).then((user) => {
    // console.log('USER?', user);
    res.status(200).send(user);
  }).catch((err) => {
    console.log(err);
  });
});

export default userRouter;

import express from 'express';
import { Router } from 'express';

const choiceRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
// import Choice from '../../db/schemas/choice';

// <-- middleware -->
choiceRouter.use(express.json());
choiceRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************


export default choiceRouter;

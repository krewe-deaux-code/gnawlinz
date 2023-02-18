import express from 'express';
import { Router } from 'express';

const charAllyRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
// import Character_Ally from '../../db/schemas/character_ally';

// <-- middleware -->
charAllyRouter.use(express.json());
charAllyRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************


export default charAllyRouter;

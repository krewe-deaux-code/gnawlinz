import express from 'express';
import { Router } from 'express';

const enemyRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
// import Enemy from '../../db/schemas/enemy';

// <-- middleware -->
enemyRouter.use(express.json());
enemyRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************


export default enemyRouter;

import express from 'express';
import { Router } from 'express';

const itemRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
// import Item from '../../db/schemas/item';

// <-- middleware -->
itemRouter.use(express.json());
itemRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************


export default itemRouter;

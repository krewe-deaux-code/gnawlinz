import express from 'express';
import { Router } from 'express';

const eventRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
// import Event from '../../db/schemas/event';

// <-- middleware -->
eventRouter.use(express.json());
eventRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************


export default eventRouter;

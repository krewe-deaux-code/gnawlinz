import express from 'express';
import { Router } from 'express';

const storyRouter = Router();

// <-- Unsure if we need these -->
// import { Sequelize } from 'sequelize';
// import { db } from '../../db/index';
// import '../auth/auth';

// <-- DB Model -->
// import Story from '../../db/schemas/story';

// <-- middleware -->
storyRouter.use(express.json());
storyRouter.use(express.urlencoded({ extended: true }));

// ******************
// *** DB Queries ***
// ******************


export default storyRouter;

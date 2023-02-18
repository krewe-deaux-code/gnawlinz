import 'dotenv/config';
import 'postgresql';
import { Sequelize } from 'sequelize';
// BEGIN DATABASE SEED DATA IMPORTS //

import { iconSeed } from '../db/seeders/seedData/iconSeed';
import { allySeed } from './seeders/seedData/allySeed';
// import { characterAllySeed } from './seeders/seedData/allySeed';
import { characterSeed } from './seeders/seedData/characterSeed';
// import { choiceSeed } from './seeders/seedData/choiceSeed';
// import { enemySeed } from './seeders/seedData/enemySeed';
// import { eventSeed } from './seeders/seedData/eventSeed';
// import { itemSeed } from './seeders/seedData/itemSeed';
// import { locationSeed } from './seeders/seedData/locationSeed';
// import { storySeed } from './seeders/seedData/storySeed';

// END DATABASE SEED DATA IMPORTS //

// *********************
// *** DB CONNECTION ***
// *********************

const { DB_USER, DATABASE_URL, DB, DBPW } = process.env;
//uncomment second sequelize call for using external db
export const db = new Sequelize(DB!, DB_USER!, DBPW!, {
  host: DATABASE_URL,
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false
  //   }
  // }
});

db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

// *******************
// *** MODEL SYNCS ***
// *******************

import Ally from './schemas/ally';
import Character from './schemas/character';
import Choice from './schemas/choice';
import Enemy from './schemas/enemy';
import Event from './schemas/events';
import Item from './schemas/item';
import Location from './schemas/location';
import Story from './schemas/story';
import User from './schemas/user';
import Character_Ally from './schemas/character_ally';
import Icon from './schemas/gameAssets/icon';

// *************************
// *** Seeder Fn Imports ***
// *************************

import iconSeeder from './seeders/iconSeeder';
import allySeeder from './seeders/allySeeder';
// import characterAllySeeder from './seeders/characterAllySeeder';
import characterSeeder from './seeders/characterSeeder';
// import choiceSeeder from './seeders/choiceSeeder';
// import enemySeeder from './seeders/enemySeeder';
// import eventSeeder from './seeders/eventSeeder';
// import itemSeeder from './seeders/itemSeeder';
// import locationSeeder from './seeders/locationSeeder';
// import storySeeder from './seeders/storySeeder';

const modelSync = async (dropTables = false) => {
  const options = {
    force: dropTables
  };
  await Story.sync(options);
  await Enemy.sync(options);
  await Ally.sync(options);
  await Item.sync(options);
  await Location.sync(options);
  await Character.sync(options);
  await User.sync(options);
  await Choice.sync(options);
  await Event.sync(options);
  await Character_Ally.sync(options);
  await Icon.sync(options);
  // ↑↑↑ Tables Synced ↑↑↑
  // ↓↓↓  Seed Tables  ↓↓↓
  await iconSeeder(iconSeed);
  await allySeeder(allySeed);
  // await characterAllySeeder(characterAllySeed);
  await characterSeeder(characterSeed);
  // await choiceSeeder(choiceSeed);
  // await enemySeeder(enemySeed);
  // await eventSeeder(eventSeed);
  // await itemSeeder(itemSeed);
  // await locationSeeder(locationSeed);
  // await storySeeder(storySeed);
};

// <-- WILL DROP ALL TABLES -->
modelSync(true);

// <-- WON'T DROP TABLES -->
// modelSync();


// Await seed functions should eventually migrate to own file and be called via npm script

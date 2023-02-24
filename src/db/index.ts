import 'dotenv/config';
import 'postgresql';
import { Sequelize } from 'sequelize';
// BEGIN DATABASE SEED DATA IMPORTS //

//import { iconSeed } from '../db/seeders/seedData/iconSeed';
import { allySeed } from './seeders/seedData/allySeed';
import { characterSeed } from './seeders/seedData/characterSeed';
import { choiceSeed } from './seeders/seedData/choiceSeed';
import { enemySeed } from './seeders/seedData/enemySeed';
import { eventSeed } from './seeders/seedData/eventSeed';
import { itemSeed } from './seeders/seedData/itemSeed';
import { locationSeed } from './seeders/seedData/locationSeed';
import { storySeed } from './seeders/seedData/storySeed';
// import { characterAllySeed } from './seeders/seedData/characterAllySeed';
// import { locationEventSeed } from './seeders/seedData/locationEventSeed';

// END DATABASE SEED DATA IMPORTS //

// *********************
// *** DB CONNECTION ***
// *********************

const { DB_USER, DATABASE_URL, DB, DBPW, DB_PORT } = process.env;
//uncomment second sequelize call for using external db
export const db = new Sequelize(DB!, DB_USER!, DBPW!, {
  host: DATABASE_URL,
  port: DB_PORT as any * 1,
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
  .then(() => console.log(`Connected to database ${DB} @ ${DATABASE_URL}`))
  .catch((error) => console.error('Unable to connect to the database:', error));

// *******************
// *** MODEL SYNCS ***
// *******************

import Ally from './schemas/ally';
import Item from './schemas/item';
import Location from './schemas/location';
import Character from './schemas/character';
import User from './schemas/user';
import Choice from './schemas/choice';
import Enemy from './schemas/enemy';
import Event from './schemas/event';
import Story from './schemas/story';
import Character_Ally from './schemas/character_ally';
import Location_Event from './schemas/location_event'
//import Icon from './schemas/gameAssets/icon';

// *************************
// *** Seeder Fn Imports ***
// *************************

//import iconSeeder from './seeders/iconSeeder';
import allySeeder from './seeders/allySeeder';
import characterSeeder from './seeders/characterSeeder';
import choiceSeeder from './seeders/choiceSeeder';
import enemySeeder from './seeders/enemySeeder';
import eventSeeder from './seeders/eventSeeder';
import itemSeeder from './seeders/itemSeeder';
import locationSeeder from './seeders/locationSeeder';
import storySeeder from './seeders/storySeeder';
// import characterAllySeeder from './seeders/characterAllySeeder';
// import locationEventSeeder from './seeders/locationEventSeeder';

const modelSync = async (dropTables = false) => {
  const options = {
    force: dropTables
  };
  await Item.sync(options);
  await Enemy.sync(options);
  await Ally.sync(options);
  await Location.sync(options);
  await Choice.sync(options);
  await Event.sync(options);
  await Character.sync(options).then(() => console.log('Char Table Created')).catch((err) => console.log('char table err', err));
  await User.sync(options);
  await Character_Ally.sync(options);
  await Location_Event.sync(options);
  await Story.sync(options);
  //await Icon.sync(options);
  // ↑↑↑ Tables Synced ↑↑↑
  // ↓↓↓  Seed Tables  ↓↓↓
  await itemSeeder(itemSeed);
  await enemySeeder(enemySeed);
  await allySeeder(allySeed);
  await locationSeeder(locationSeed);
  await characterSeeder(characterSeed);
  await choiceSeeder(choiceSeed);
  await eventSeeder(eventSeed);
  // await characterAllySeeder(characterAllySeed);
  await storySeeder(storySeed);
  //await iconSeeder(iconSeed);
};

// <-- WILL DROP ALL TABLES -->
modelSync(true);

// <-- WON'T DROP TABLES -->
// modelSync();


// Await seed functions should eventually migrate to own file and be called via npm script

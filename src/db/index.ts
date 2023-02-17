import 'dotenv/config';
import 'postgresql';
import { Sequelize } from 'sequelize';

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
};

// <-- WILL DROP ALL TABLES -->
// modelSync(true);

// <-- WON'T DROP TABLES -->
modelSync();

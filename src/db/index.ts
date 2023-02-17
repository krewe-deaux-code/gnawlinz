import 'dotenv/config';
import 'postgresql';
import { Sequelize } from 'sequelize';

// const Models = [ Ally, Character, Choice, Enemy, Event, Item, Location, Story, User];

// *********************
// *** DB CONNECTION ***
// *********************

const { DB_USER, DATABASE_URL, DB, DBPW } = process.env;
//uncomment second sequelize call for using external db
export const db = new Sequelize(DB!, DB_USER!, DBPW!, {
  host: DATABASE_URL,
  dialect: 'postgres',
  protocol: 'postgres',
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

(async () => {
  await Story.sync({ force: true });
  await Enemy.sync({ force: true });
  await Ally.sync({ force: true });
  await Item.sync({ force: true });
  await Location.sync({ force: true });
  await Character.sync({ force: true });
  await User.sync({ force: true });
  await Choice.sync({ force: true });
  await Event.sync({ force: true });
  // <-- Cur Ally Join Table Sync -->
})();


// db.sync({ force: true });

// Try Promise.all() --> Array of syncs?

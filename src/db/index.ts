//import path from 'path';
//import passport from 'passport';
//import GoogleStrategy from 'passport-google-oauth20';
//import { Sequelize } from 'sequelize-typescript'; //UNINSTALL ME?
import 'dotenv/config';
//import schemas
import { Sequelize } from 'sequelize'

const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DATABASE_URL as string;  //uncomment to use second sequelize call for using external db

//uncomment second sequelize call for using external db
const sequelize = new Sequelize('gnawlinz', dbUser, '', {
  host: dbHost,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));
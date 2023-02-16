//import path from 'path';
//import passport from 'passport';
//import GoogleStrategy from 'passport-google-oauth20';
//import { Sequelize } from 'sequelize-typescript'; //UNINSTALL ME?
import 'dotenv/config';
import 'postgresql'; // ???
import { Sequelize } from 'sequelize';
//import User from './schemas/user';
import { DataTypes } from 'sequelize';
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


//import Character from './character';
const User = db.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  googleId: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  avatar: {
    type: DataTypes.STRING
  },
  char0: {
    type: DataTypes.INTEGER,
    references: {
      //model: Character,
      key: 'id'
    }
  },
  char1: {
    type: DataTypes.INTEGER,
    references: {
      //model: Character, 
      key: 'id'
    }
  },
  char2: {
    type: DataTypes.INTEGER,
    references: {
      //model: Character, 
      key: 'id'
    }
  }
});

module.exports.db = db;
module.exports.User = User;
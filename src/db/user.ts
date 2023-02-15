import axios from 'axios';
import {DataTypes } from 'sequelize';
import { db } from './index';
const User = db.define('user', {
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
    type: DataTypes.STRING, //INTEGER?
    references: {
      //model: Character, //uncomment this when the character model is in the DB
      key: 'id'
    }
  },
  char1: {
    type: DataTypes.STRING, //INTEGER?
    references: {
      //model: Character, //uncomment this when the character model is in the DB
      key: 'id'
    }
  },
  char2: {
    type: DataTypes.STRING, //INTEGER?
    references: {
      //model: Character, //uncomment this when the character model is in the DB
      key: 'id'
    }
  }
});

export default User;

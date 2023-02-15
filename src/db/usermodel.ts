import axios from 'axios';
import {DataTypes } from 'sequelize';
import { db } from './index';
const User = db.define('user', {
  googleId: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  }
});

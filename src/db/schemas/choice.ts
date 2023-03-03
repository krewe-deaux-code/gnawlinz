import { DataTypes } from 'sequelize';
import { db } from '../index';
// import Enemy from './enemy';
// import Ally from './ally';
// import Item from './item';

const Choice = db.define('choice', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  flavor_text: {
    type: DataTypes.TEXT
  },
  success: {
    type: DataTypes.TEXT
  },
  failure: {
    type: DataTypes.TEXT
  },
  alignment0: {
    type: DataTypes.STRING
  },
  alignment1: {
    type: DataTypes.STRING
  },
  alignment2: {
    type: DataTypes.STRING
  },
  enemy_effect: {
    type: DataTypes.BOOLEAN,
  },
  ally_effect: {
    type: DataTypes.BOOLEAN,
  },
  item_effect: {
    type: DataTypes.BOOLEAN,
  },
});

export default Choice;

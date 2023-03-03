import { DataTypes } from 'sequelize';
import { db } from '../index';
import Choice from './choice';

const Event = db.define('event', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  initial_text: {
    type: DataTypes.TEXT
  },
  choice0: {
    type: DataTypes.INTEGER,
    references: {
      model: Choice,
      key: '_id'
    }
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
  choice1: {
    type: DataTypes.INTEGER,
    references: {
      model: Choice,
      key: '_id'
    }
  },
  choice2: {
    type: DataTypes.INTEGER,
    references: {
      model: Choice,
      key: '_id'
    }
  },
  choice3: {
    type: DataTypes.INTEGER,
    references: {
      model: Choice,
      key: '_id'
    }
  },
});

export default Event;

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
  }
})

export default Event;

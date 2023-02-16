import { DataTypes } from 'sequelize';
import { db } from './index';
import Choice from './choice';

const Event = db.define('character', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  initial_text: {
    type: DataTypes.STRING
  },
  choice0: {
    type: DataTypes.INTEGER,
    references: {
      model: Choice,
      key: 'id'
    }
  },
  choice1: {
    type: DataTypes.INTEGER,
    references: {
      model: Choice,
      key: 'id'
    }
  },
  choice2: {
    type: DataTypes.INTEGER,
    references: {
      model: Choice,
      key: 'id'
    }
  },
  choice3: {
    type: DataTypes.INTEGER,
    references: {
      model: Choice,
      key: 'id'
    }
  }
})
import { DataTypes } from 'sequelize';
import { db } from '../index';

const Enemy = db.define('enemy', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  image_url: {
    type: DataTypes.STRING
  },
  weapon1: {
    type: DataTypes.STRING
  },
  strength: {
    type: DataTypes.INTEGER
  },
  health: {
    type: DataTypes.INTEGER
  },
  score: {
    type: DataTypes.INTEGER
  },
  initial_text: {
    type: DataTypes.TEXT
  },
  victory: {
    type: DataTypes.TEXT
  },
  defeat: {
    type: DataTypes.TEXT
  },
  contact: {
    type: DataTypes.TEXT
  }
});

export default Enemy;

import { DataTypes } from 'sequelize';
import { db } from '../index';
import Location from './location';
import Event from './event';

const Boss = db.define('boss',
  {
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
    location: {
      type: DataTypes.INTEGER,
      references: {
        model: Location,
        key: '_id'
      }
    },
    score: {
      type: DataTypes.INTEGER
    },
    event: {
      type: DataTypes.INTEGER,
      references: {
        model: Event,
        key: '_id'
      }
    },
    victory: {
      type: DataTypes.TEXT
    },
    defeat: {
      type: DataTypes.TEXT
    },
    contact: {
      type: DataTypes.TEXT
    },
  });

export default Boss;

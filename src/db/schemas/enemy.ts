import { DataTypes } from 'sequelize';
import { db } from '../index';
import Location from './location';

const Enemy = db.define('character', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  weapon1: {
    type: DataTypes.STRING
  },
  location:{
    type: DataTypes.STRING,
    references: {
      model: Location,
      key: 'id'
    }
  },
})

export default Enemy;

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
  image: {
    type: DataTypes.STRING
  },
  weapon1: {
    type: DataTypes.STRING
  },
})

export default Enemy;

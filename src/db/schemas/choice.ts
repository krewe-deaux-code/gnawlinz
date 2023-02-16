import { DataTypes } from 'sequelize';
import { db } from '../index';

const Choice = db.define('character', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  flavor_text0: {
    type: DataTypes.STRING
  },
  flavor_text1: {
    type: DataTypes.STRING
  }
  // benefits and detriments?
})

Choice.sync({ force: true })
  .then(() => console.log('Choice table created'));

export default Choice;

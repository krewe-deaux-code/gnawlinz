import { DataTypes } from 'sequelize';
import { db } from '../index';
import Character from './character';

const Ally = db.define('character', {
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
      model: Character,
      key: 'id'
    }
  },
  char_id:{
    type: DataTypes.INTEGER,
    references: {
      model: Character,
      key: 'id'
    }
  },
})
Ally.sync({ force: true })
  .then(() => console.log('Ally table created'));

export default Ally;

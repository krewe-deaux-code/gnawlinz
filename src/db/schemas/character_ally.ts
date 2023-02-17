import { DataTypes } from 'sequelize';
import { db } from '../index';
import Character from './character';
import Ally from './ally';

const Character_Ally = db.define('character_ally', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  char_id:{
    type: DataTypes.INTEGER,
    references: {
      model: Character,
      key: '_id'
    }
  },
  ally_id:{
    type: DataTypes.INTEGER,
    references: {
      model: Ally,
      key: '_id'
    }
  },
})
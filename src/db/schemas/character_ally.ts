import { DataTypes } from 'sequelize';
import { db } from '../index';
import Character from './character';
import Ally from './ally';

// *****************************************
// *** Current User-Char's teammate/ally ***
// *****************************************

const Character_Ally = db.define('character_ally', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  char_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Character,
      key: '_id'
    }
  },
  ally_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ally,
      key: '_id'
    }
  },
  health: {
    type: DataTypes.INTEGER
  },
  mood: {
    type: DataTypes.INTEGER
  },
  weapon1: {
    type: DataTypes.STRING
  },
});

export default Character_Ally;

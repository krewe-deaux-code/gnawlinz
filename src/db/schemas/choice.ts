import { DataTypes } from 'sequelize';
import { db } from '../index';
import Story from './story';
import Enemy from './enemy';
import Ally from './ally';
import Item from './item';

const Choice = db.define('choice', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  flavor_text0: {
    type: DataTypes.STRING
  },
  flavor_text1: {
    type: DataTypes.STRING
  },
  story_effect: {
    type: DataTypes.INTEGER,
    references: {
      model: Story,
      key: '_id'
    },
  },
  enemy_effect: {
    type: DataTypes.INTEGER,
    references: {
      model: Enemy,
      key: '_id'
    }
  },
  ally_effect: {
    type: DataTypes.INTEGER,
    references: {
      model: Ally,
      key: '_id'
    }
  },
  item_effect: {
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: '_id'
    }
  },
})

export default Choice;

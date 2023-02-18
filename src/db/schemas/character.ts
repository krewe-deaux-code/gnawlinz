import { DataTypes } from 'sequelize';
import { db } from '../index';
import Item from './item'
import Location from './location';

const Character = db.define('character', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  handle_id: {
    type: DataTypes.INTEGER
  },
  name:{
    type: DataTypes.STRING,
    unique: true
  },
  image:{
    type: DataTypes.STRING,
  },
  slot0:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: '_id'
    }
  },
  slot1:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: '_id'
    }
  },
  slot2:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: '_id'
    }
  },
  slot3:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: '_id'
    }
  },
  slot4:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: '_id'
    }
  },
  slot5:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: '_id'
    }
  },
  slot6:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: '_id'
    }
  },
  slot7:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: '_id'
    }
  },
  health:{
    type: DataTypes.INTEGER
  },
  strength:{
    type: DataTypes.INTEGER
  },
  endurance:{
    type: DataTypes.INTEGER
  },
  mood:{
    type: DataTypes.INTEGER
  },
  location:{
    type: DataTypes.INTEGER,
    references: {
      model: Location,
      key: '_id'
    }
  },
  ally_count:{
    type: DataTypes.INTEGER
  },
})

export default Character;

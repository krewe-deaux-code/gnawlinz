import { DataTypes } from 'sequelize';
import { db } from '../index';
import Item from './item'
import Location from './location';
const Character = db.define('character', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  handle_id: {
    type: DataTypes.INTEGER
  },
  name:{
    type: DataTypes.STRING,
  },
  image:{
    type: DataTypes.STRING,
  },
  slot0:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: 'id'
    }
  },
  slot1:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: 'id'
    }
  },
  slot2:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: 'id'
    }
  },
  slot3:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: 'id'
    }
  },
  slot4:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: 'id'
    }
  },
  slot5:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: 'id'
    }
  },
  slot6:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: 'id'
    }
  },
  slot7:{
    type: DataTypes.INTEGER,
    references: {
      model: Item,
      key: 'id'
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
      key: 'id'
    }
  },
  ally_count:{
    type: DataTypes.INTEGER
  },
})

Character.sync({ force: true })
  .then(() => console.log('Character table created'));

export default Character;

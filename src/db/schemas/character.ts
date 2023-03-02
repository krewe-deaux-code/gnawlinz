import { DataTypes } from 'sequelize';
import { db } from '../index';
// import Item from './item';
import Location from './location';
// import User from './user';

const Character = db.define('character', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  handle_id: {
    type: DataTypes.STRING,
    // references: {
    //   model: User,
    //   key: 'user_id'
    // }
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  image_url: {
    type: DataTypes.STRING,
  },
  inventory: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: []
  },
  health: {
    type: DataTypes.INTEGER
  },
  strength: {
    type: DataTypes.INTEGER
  },
  endurance: {
    type: DataTypes.INTEGER
  },
  mood: {
    type: DataTypes.INTEGER
  },
  location: {
    type: DataTypes.INTEGER,
    references: {
      model: Location,
      key: '_id'
    }
  },
  ally_count: {
    type: DataTypes.INTEGER
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

export default Character;

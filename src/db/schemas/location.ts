import { DataTypes } from 'sequelize';
import { db } from '../index';

const Location = db.define('location', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING
  },
  image_url:{
    type: DataTypes.STRING
  },
  random_item_spot1:{
    type: DataTypes.STRING
  },
  random_item_spot2:{
    type: DataTypes.STRING
  },
  drop_item_slot:{
    type: DataTypes.STRING
  },
  graffiti:{
    type: DataTypes.STRING
  },
  graffiti_msg:{
    type: DataTypes.TEXT
  },
})

export default Location;

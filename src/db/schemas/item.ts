import { DataTypes } from 'sequelize';
import { db } from '../index';


const Item = db.define('item', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  image_url: {
    type: DataTypes.STRING
  },
  consumable: {
    type: DataTypes.BOOLEAN
  },
  modified_stat0: {
    type: DataTypes.STRING
  },
  modified_stat1: {
    type: DataTypes.STRING
  },
  modifier0: {
    type: DataTypes.INTEGER
  },
  modifier1: {
    type: DataTypes.INTEGER
  },
  buy_price: {
    type: DataTypes.INTEGER
  },
  sell_price: {
    type: DataTypes.INTEGER
  }
});

export default Item;

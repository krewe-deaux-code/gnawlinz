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
  image: {
    type: DataTypes.STRING
  },
  consumable:{
    type: DataTypes.BOOLEAN
  },
  modified_stat: {
    type: DataTypes.STRING
  },
  modifier: {
    type: DataTypes.STRING
  },
  buy_price:{
    type: DataTypes.INTEGER
  },
  sell_price:{
    type: DataTypes.INTEGER
  }
})

export default Item;

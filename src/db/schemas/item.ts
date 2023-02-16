import { DataTypes } from 'sequelize';
import { db } from '../index';


const Item = db.define('character', {
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

Item.sync({ force: true })
  .then(() => console.log('Item table created'));

export default Item;

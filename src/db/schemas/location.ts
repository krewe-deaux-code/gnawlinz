import { DataTypes } from 'sequelize';
import { db } from '../index';
import Ally from './ally';
//import Enemy form './enemy';
const Location = db.define('character', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name:{
    type: DataTypes.STRING
  },
  image:{
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
  graffitiMsg:{
    type: DataTypes.STRING
  },
  allies_id:{
    type: DataTypes.INTEGER,
    references: {
      model: Ally,
      key: 'id'
    }
  },
  enemies_id:{
    type: DataTypes.INTEGER,
    references: {
      //model: Enemy,
      key: 'id'
    }
  },

})

export default Location;

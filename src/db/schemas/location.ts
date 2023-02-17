import { DataTypes } from 'sequelize';
import { db } from '../index';

const Location = db.define('location', {
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
  // allies_id:{
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Ally,
  //     key: '_id'
  //   }
  // },
  // enemies_id:{
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Enemy,
  //     key: '_id'
  //   }
  // },

})

// Location.sync({ force: true })
//   .then(() => console.log('Location table created'))
//   .catch((err: any) => console.log('Location tables failed to create', err));

export default Location;

import { DataTypes } from 'sequelize';
import { db } from '../index';

const Enemy = db.define('enemy', {
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
  weapon1: {
    type: DataTypes.STRING
  },
})

// await Enemy.sync({ force: true })
//   .then(() => console.log('Enemy table created'))
//   .catch((err: any) => console.log('Enemy table failed to create', err));

export default Enemy;

// location:{
//   type: DataTypes.STRING,
//   references: {
//     model: Location,
//     key: '_id'
//   }
// },

import { DataTypes } from 'sequelize'; // import Model
import { db } from '../index';

const Ally = db.define('ally', {
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
  // char_id:{
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Character,
  //     key: '_id'
  //   }
  // },
})

// await Ally.sync({ force: true })
//   .then(() => console.log('Ally table created'))
//   .catch((err: any) => console.log('Ally table failed to create', err));

export default Ally;

// location:{
//   type: DataTypes.STRING,
//   references: {
//     model: Location,
//     key: '_id'
//   }
// },

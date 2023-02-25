import { DataTypes } from 'sequelize'; // import Model
import { db } from '../index';

// *******************************************************
// *** All possible allies in current instance of game ***
// *******************************************************

const Ally = db.define('ally', {
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
  strength: {
    type: DataTypes.INTEGER
  },
  endurance: {
    type: DataTypes.INTEGER
  },
  alignment: {
    type: DataTypes.STRING
  },
});

export default Ally;

import { DataTypes } from'sequelize';
import { db } from '../../index';

const Icon = db.define('icon', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
});

export default Icon;

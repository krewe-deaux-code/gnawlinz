import { DataTypes } from 'sequelize';
import { db } from '../index';

const Story = db.define('story', {
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  }
});

export default Story;
import { DataTypes } from 'sequelize';
import { db } from '../index';
const Story = db.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

export default Story;
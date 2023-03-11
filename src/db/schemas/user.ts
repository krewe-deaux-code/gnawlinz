import { DataTypes } from 'sequelize';
import { db } from '../index';
// import Character from './character';

const User = db.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true
  },
  google_id: {
    type: DataTypes.STRING
  },
  google_avatar: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  session_id: {
    type: DataTypes.STRING
  },
});

export default User;

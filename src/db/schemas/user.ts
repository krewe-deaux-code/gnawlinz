import { DataTypes } from 'sequelize';
import { db } from '../index';
import Character from './character';
const User = db.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  googleId: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  avatar: {
    type: DataTypes.STRING
  },
  char0: {
    type: DataTypes.INTEGER,
    references: {
      model: Character,
      key: 'id'
    }
  },
  char1: {
    type: DataTypes.INTEGER,
    references: {
      model: Character,
      key: 'id'
    }
  },
  char2: {
    type: DataTypes.INTEGER,
    references: {
      model: Character,
      key: 'id'
    }
  }
});

User.sync({ force: true })
  .then(() => console.log('User table created'));

export default User;

import { DataTypes } from 'sequelize';
import { db } from '../index';
const User = db.define('users', {
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
  }
});

User.sync({force:true})
  .then(()=>console.log('user table synced'))
  .catch(()=>console.error('failed to create users table.'))

export default User;
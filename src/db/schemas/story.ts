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
Story.sync({ force: true })
  .then(() => console.log('Story table created'));
export default Story;
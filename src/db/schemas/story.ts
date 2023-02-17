import { DataTypes } from 'sequelize';
import { db } from '../index';

const Story = db.define('story', {
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true
  }
});

// Story.sync({ force: true })
//   .then(() => console.log('Story table created'))
//   .catch((err: any) => console.log('Story table failed to create', err));

export default Story;
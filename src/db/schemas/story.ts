import { DataTypes } from 'sequelize';
import { db } from '../index';
import Character from './character';

const Story = db.define('story', {
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  },
  character_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Character,
      key: '_id'
    }
  },
  char_choices: {
    type: DataTypes.ARRAY(DataTypes.TEXT)
  },
});

export default Story;
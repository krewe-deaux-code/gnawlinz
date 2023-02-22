// To be implemented in a future build
// Will serve as a Join Table between Locaiton and 
// Event tables to create relationship between the entries of each

import { DataTypes } from 'sequelize';
import { db } from '../index';
import Location from './location';
import Event from './event';
const Location_Event = db.define('location_event', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  event_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: '_id'
    }
  },
  location_id: {
    type: DataTypes.INTEGER,
      references: {
        model: Location,
        key: '_id'
      }
  }
})

export default Location_Event

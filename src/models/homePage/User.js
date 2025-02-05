import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect';  // Import the sequelize instance
import SingleImage from './SingleImage.js';      // Import SingleImage model

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

// Polymorphic association (User can have many images)
User.hasMany(SingleImage, {
  foreignKey: 'referenceId',
  constraints: false,
  scope: {
    referenceType: 'User',
  },
});

SingleImage.belongsTo(User, {
  foreignKey: 'referenceId',
  constraints: false,
  scope: {
    referenceType: 'User',
  },
});

export default User;

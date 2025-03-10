import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize instance


const ImagesData = sequelize.define('ImagesData', {
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  altText: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  referenceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  referenceType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'images_data',
  timestamps: true,
});



export default ImagesData;

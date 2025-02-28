import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize instance

const BlogImageData = sequelize.define('BlogImageData', {
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  altText: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'blog_images_data',
  timestamps: true,
});



export default BlogImageData;

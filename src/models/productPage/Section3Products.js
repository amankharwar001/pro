import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance
import heroSectionProductPage from './HeroSectionProductPage.js';


const section3Product = sequelize.define('Section3Product', {
  heading: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensuring the heading field is required
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,  // Ensuring the text field is required
  },
  heroSectionId: {
    type: DataTypes.UUID,
    references: {
      model: heroSectionProductPage,
      key: 'id',
    },
    allowNull: false,
  },
  info: {
    type: DataTypes.JSON,
    allowNull: false,  // Ensuring the text field is required
  },
}, {
  tableName: 'section_3_product',  // Ensure this matches your table name exactly
  timestamps: true,
});

section3Product.belongsTo(heroSectionProductPage, { foreignKey: 'heroSectionId' });

export default section3Product;



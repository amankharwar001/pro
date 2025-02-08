import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance
import heroSectionProductPage from './HeroSectionProductPage.js';


const section4Product = sequelize.define('Section4Product', {
  heading: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensuring the heading field is required
  },
  heroSectionId: {
    type: DataTypes.UUID,
    references: {
      model: heroSectionProductPage,
      key: 'id',
    },
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,  // Ensuring the text field is required
  },
}, {
  tableName: 'section_4_product',  // Ensure this matches your table name exactly
  timestamps: true,
});
section4Product.belongsTo(heroSectionProductPage, { foreignKey: 'heroSectionId' });

export default section4Product;



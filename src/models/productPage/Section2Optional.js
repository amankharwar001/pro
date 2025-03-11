import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';
import heroSectionProductPage from './HeroSectionProductPage.js';
const Section2Optional = sequelize.define('Section2Optional', {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  heroSectionId: {
    type: DataTypes.UUID,
    references: {
      model: heroSectionProductPage,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'section_2_product_optional',
  timestamps: true,
});

// Define the relationship
Section2Optional.belongsTo(heroSectionProductPage, { foreignKey: 'heroSectionId' });

export default Section2Optional;
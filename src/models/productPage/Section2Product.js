// import { DataTypes } from 'sequelize';
// import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance


// const section2Product = sequelize.define('Section2Product', {
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,  // Ensuring the heading field is required
//   },
// }, {
//   tableName: 'section_2_product',  // Ensure this matches your table name exactly
//   timestamps: true,
// });


// export default section2Product;


import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';
import heroSectionProductPage from './HeroSectionProductPage.js';
// import heroSectionProductPage from './HeroSectionProductPage';  // Import HeroSectionProductPage model
const section2Product = sequelize.define('Section2Product', {
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
  tableName: 'section_2_product',
  timestamps: true,
});

// Define the relationship
section2Product.belongsTo(heroSectionProductPage, { foreignKey: 'heroSectionId' });

export default section2Product;

import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance
import heroSectionProductPage from './HeroSectionProductPage.js';


const section7Product = sequelize.define('Section7Product', {
    heading: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the heading field is required
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,  // Ensuring the text field is required
    },
    btn: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the button field is required
    },
    btnLink: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the button link field is required
    },
    info: {
        type: DataTypes.JSON,
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

}, {
    tableName: 'section_7_product',  // Ensure this matches your table name exactly
    timestamps: true,
});

section7Product.belongsTo(heroSectionProductPage, { foreignKey: 'heroSectionId' });

export default section7Product;



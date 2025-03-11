import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize instance
import heroSectionProductPage from './HeroSectionProductPage.js';  // Assuming it's relevant


const ProductPageStatus = sequelize.define('ProductPageStatus', {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'draft', // Set default value as 'draft'
    },
    productId: {
        type: DataTypes.UUID,
        references: {
            model: heroSectionProductPage,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    tableName: 'product_page_status', // Ensure this matches your table name exactly
    timestamps: true,
});

ProductPageStatus.belongsTo(heroSectionProductPage, { foreignKey: 'productId' });

export default ProductPageStatus;

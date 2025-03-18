

import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  
import heroSectionProductPage from './HeroSectionProductPage.js';  

const SEOProductPage = sequelize.define('SEOProductPage', {
    title: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,  
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    keyword: {
        type: DataTypes.STRING, 
        allowNull: true,  
        get() {
            const value = this.getDataValue('keyword');
            return value ? value.split(',').map((k) => k.trim()) : [];  
        },
        set(value) {
            this.setDataValue('keyword', Array.isArray(value) ? value.join(', ') : value); 
        }
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
    tableName: 'SEO_Product_Page', 
    timestamps: true,
});
SEOProductPage.belongsTo(heroSectionProductPage, { foreignKey: 'heroSectionId' });

export default SEOProductPage;

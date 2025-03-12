import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const CreatePageSEO = sequelize.define('CreatePageSEO', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false, 
      },
    title: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false, 
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    keyword: {
        type: DataTypes.STRING,  
        allowNull: false,
        get() {
            const value = this.getDataValue('keyword');
            return value ? value.split(',').map((k) => k.trim()) : [];
        },
        set(value) {
            this.setDataValue('keyword', Array.isArray(value) ? value.join(', ') : value);
        }
    },
    
}, {
    tableName: 'create_page_seo',
    timestamps: true,
});

export default CreatePageSEO;
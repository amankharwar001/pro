

import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize instance

const CommonSEO = sequelize.define('CommonSEO', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the title field is required
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,  // Ensuring the description field is required
    },
    pageType: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the slug field is required
    },
    keyword: {
        type: DataTypes.STRING,  // Store as a string, comma-separated
        allowNull: false,  // Ensuring the keyword field is required
        get() {
            const value = this.getDataValue('keyword');
            return value ? value.split(',').map((k) => k.trim()) : [];  // Return as an array when reading from DB
        },
        set(value) {
            this.setDataValue('keyword', Array.isArray(value) ? value.join(', ') : value);  // Store as a comma-separated string
        }
    },
}, {
    tableName: 'common_seo',  // Ensure this matches your table name exactly
    timestamps: true,
});

export default CommonSEO;

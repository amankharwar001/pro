import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'category', // Ensure this matches your table name exactly
    timestamps: true,
});

export default Category;
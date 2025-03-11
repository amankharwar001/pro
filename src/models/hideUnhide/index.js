import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const HideUnhideStatus = sequelize.define('HideUnhideStatus', {
    SectionName: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the heading field is required
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the heading field is required
    },
}, {
    tableName: 'Section_HideUnhide',  // Ensure this matches your table name exactly
    timestamps: true,
});
export default HideUnhideStatus;
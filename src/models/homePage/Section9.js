import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const section9 = sequelize.define('Homesection9', {
    heading: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the heading field is required
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,  // Ensuring the heading field is required
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
        type: DataTypes.JSON, // JSON field to store boxHeading and boxContent as an array
        allowNull: false,
        defaultValue: [], // Default to an empty array
    },
    bottomtext: {
        type: DataTypes.TEXT,
        allowNull: false,  // Ensuring the button link field is required
    },
    

}, {
    tableName: 'homepage_section_12',  // Ensure this matches your table name exactly
    timestamps: true,
});
export default section9;
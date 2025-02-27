
import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const Section4 = sequelize.define('HomeSection4', {
    heading: {
        type: DataTypes.STRING,
        allowNull: false, // Ensuring the heading field is required
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false, // Ensuring the content field is required
    },
    leadDetails: {
        type: DataTypes.JSON, // Store an array of objects with leadName and leadNo
        allowNull: false,
        defaultValue: [], // Default to an empty array
    },
}, {
    tableName: 'homepage_section_4', // Ensure this matches your table name exactly
    timestamps: true,
});

export default Section4;

import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const Section6 = sequelize.define('HomeSection6', {
    heading: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the heading field is required
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,  // Ensuring the heading field is required
    },
    card: {
        type: DataTypes.JSON, // JSON field to store boxHeading and boxContent as an array
        allowNull: false,
        defaultValue: [], // Default to an empty array
    },
    bottomtext: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the heading field is required
    },
    
    
}, {
    tableName: 'homepage_section_6',  // Ensure this matches your table name exactly
    timestamps: true,
});
export default Section6;




import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const AboutSection3 = sequelize.define('AboutSection3', {
    heading: {
        type: DataTypes.STRING,
        allowNull: false, // Ensuring the heading field is required
    },
    card: {
        type: DataTypes.JSON, // Store an array of objects with leadName and leadNo
        allowNull: false,
        defaultValue: [], // Default to an empty array
    },
}, {
    tableName: 'about_section_3', // Ensure this matches your table name exactly
    timestamps: true,
});

export default AboutSection3;
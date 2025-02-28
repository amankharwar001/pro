
import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const AboutSection4 = sequelize.define('AboutSection4', {
    card: {
        type: DataTypes.JSON, // Store an array of objects with leadName and leadNo
        allowNull: false,
        defaultValue: [], // Default to an empty array
    },
}, {
    tableName: 'about_section_4', // Ensure this matches your table name exactly
    timestamps: true,
});

export default AboutSection4;
import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const Section3 = sequelize.define('HomeSection3', {
    heading: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the heading field is required
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,  // Ensuring the heading field is required
    },
    agentBrief: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the heading field is required
    },
    leadNo: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the aId field is required for association
    },
    leadName: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the heading field is required
    },
}, {
    tableName: 'homepage_section_3',  // Ensure this matches your table name exactly
    timestamps: true,
});
export default Section3;




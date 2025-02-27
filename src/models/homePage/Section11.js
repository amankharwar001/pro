import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const Section11 = sequelize.define('HomeSection11', {
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
}, {
    tableName: 'homepage_section_11',  // Ensure this matches your table name exactly
    timestamps: true,
});
export default Section11;
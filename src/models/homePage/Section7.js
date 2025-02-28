import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const Section7 = sequelize.define('HomeSection7', {
    heading: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the heading field is required
    },
    content: {
        type: DataTypes.STRING,
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
    tableName: 'homepage_section_7',  // Ensure this matches your table name exactly
    timestamps: true,
});
export default Section7;
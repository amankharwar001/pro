import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const FooterCta = sequelize.define('HomeFooterCta', {
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
    tableName: 'homepage_FooterCta',  // Ensure this matches your table name exactly
    timestamps: true,
});
export default FooterCta;
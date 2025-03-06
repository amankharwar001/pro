
import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance

const FooterScript = sequelize.define('FooterScript', {
    script: {
        type: DataTypes.STRING,
        allowNull: false, // Ensuring the content field is required
    },
}, {
    tableName: 'footer_script_model', // Ensure this matches your table name exactly
    timestamps: true,
});

export default FooterScript;
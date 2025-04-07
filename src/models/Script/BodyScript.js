
import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance

const BodyScript = sequelize.define('BodyScript', {
    script: {
        type: DataTypes.TEXT,
        allowNull: false, // Ensuring the content field is required
    },
}, {
    tableName: 'body_script_model', // Ensure this matches your table name exactly
    timestamps: true,
});

export default BodyScript;
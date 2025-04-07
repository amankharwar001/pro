
import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance

const HeadScript = sequelize.define('HeadScript', {
    script: {
        type: DataTypes.TEXT,
        allowNull: false, // Ensuring the heading field is required
    },
}, {
    tableName: 'head_script_model', // Ensure this matches your table name exactly
    timestamps: true,
});

export default HeadScript;
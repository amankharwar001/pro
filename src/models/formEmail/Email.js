import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance


const LeadFormEmail = sequelize.define('LeadFormEmail', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'lead_receive_email_detail',  // Ensure this matches your table name exactly
    timestamps: true,
});

export default LeadFormEmail;










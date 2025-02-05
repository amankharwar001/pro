import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize i nstance

const PartnerContactForm = sequelize.define("PartnerContactForm", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    partnerType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    query: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    authorization: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'partner_contact_form',  // Ensure this matches your table name exactly
    timestamps: true,
}
);

export default PartnerContactForm;
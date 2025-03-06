
import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const AdminFooterSetting = sequelize.define('AdminFooterSetting', {
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    heading: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    buttons: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
    socialLinks: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
    copyright: {
        type: DataTypes.STRING,
        allowNull: true,
    },

}, {
    tableName: 'admin_footer_setting', // Ensure this matches your table name exactly
    timestamps: true,
});

export default AdminFooterSetting;

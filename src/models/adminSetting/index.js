
import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const AdminSetting = sequelize.define('AdminSetting', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

}, {
  tableName: 'admin_basic_setting', // Ensure this matches your table name exactly
  timestamps: true,
});

export default AdminSetting;

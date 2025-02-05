import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';
const CommonTermConditionPage = sequelize.define('CommonTermConditionPage', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    referenceType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
}, {
    tableName: 'common_term_condition_privacy_editor', // Ensure this matches your table name exactly
    timestamps: true,
});

export default CommonTermConditionPage;
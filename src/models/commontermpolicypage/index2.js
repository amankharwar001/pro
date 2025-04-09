import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';
const CommonTermConditionPage2 = sequelize.define('CommonTermConditionPage2', {
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
    tableName: 'common_term_condition_privacy_editor_2', 
    timestamps: true,
});

export default CommonTermConditionPage2;
import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const CreatePageId = sequelize.define('CreatePageId', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
}, {
    tableName: 'create_page_id', 
    timestamps: true,
});

export default CreatePageId;
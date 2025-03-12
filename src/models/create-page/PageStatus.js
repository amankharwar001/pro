import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const CreatePageStatus = sequelize.define('CreatePageStatus', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false, 
      },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'draft', 
    },
    
}, {
    tableName: 'create_page_status', 
    timestamps: true,
});


export default CreatePageStatus;

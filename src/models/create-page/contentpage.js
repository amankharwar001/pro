import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const CreatePageContent = sequelize.define('CreatePageContent', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false, 
      },
    content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    
}, {
    tableName: 'create_page_content', 
    timestamps: true,
});

export default CreatePageContent;
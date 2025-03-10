import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const CreateBlogId = sequelize.define('CreateBlogId', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
}, {
    tableName: 'create_blog_id', // Ensure this matches your table name exactly
    timestamps: true,
});

export default CreateBlogId;
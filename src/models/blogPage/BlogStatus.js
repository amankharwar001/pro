import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';
import CreateBlogId from './IdGenerate.js';

const BlogStatus = sequelize.define('BlogStatus', {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'draft', // Set default value as 'draft'
    },
    blogId: {
        type: DataTypes.UUID,
        references: {
          model: 'create_blog_id', // Model name from which blogId references
          key: 'id',
        },
        allowNull: false,
    },
}, {
    tableName: 'blog_status', // Ensure this matches your table name exactly
    timestamps: true,
});

BlogStatus.belongsTo(CreateBlogId, { foreignKey: 'blogId' });

export default BlogStatus;

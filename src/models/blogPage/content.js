import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';
import CreateBlogId from './IdGenerate.js';
const ContentBlog = sequelize.define('ContentBlog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
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
    tableName: 'content_blog', // Ensure this matches your table name exactly
    timestamps: true,
});
ContentBlog.belongsTo(CreateBlogId, { foreignKey: 'blogId' });

export default ContentBlog;
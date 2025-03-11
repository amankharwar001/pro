import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';
import CreateBlogId from './IdGenerate.js';
const CommonBlogContent = sequelize.define('CommonBlogContent', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    blogId: {
        type: DataTypes.UUID,
        references: {
            model: 'create_blog_id', // Model name from which blogId references
            key: 'id',
        },
        allowNull: false,
    }, 
    heading: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    selectedCategories: {
        type: DataTypes.JSONB,  // Storing an array of category IDs
        allowNull: false,
    },
}, {
    tableName: 'common_blog_content', // Ensure this matches your table name exactly
    timestamps: true,
});
CommonBlogContent.belongsTo(CreateBlogId, { foreignKey: 'blogId' });
export default CommonBlogContent;
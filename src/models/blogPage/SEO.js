import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';  // Import the sequelize instance
import CreateBlogId from './IdGenerate.js'; // Assuming it's relevant

const SEOBlogPage = sequelize.define('SEOBlogPage', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the title field is required
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,  // Ensuring the description field is required
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the slug field is required
    },
    keyword: {
        type: DataTypes.STRING,  // Store as a string, comma-separated
        allowNull: true,  // Ensuring the keyword field is required
        get() {
            const value = this.getDataValue('keyword');
            return value ? value.split(',').map((k) => k.trim()) : [];  // Return as an array when reading from DB
        },
        set(value) {
            this.setDataValue('keyword', Array.isArray(value) ? value.join(', ') : value);  // Store as a comma-separated string
        }
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
    tableName: 'seo_blog_page',  // Ensure this matches your table name exactly
    timestamps: true,
});
SEOBlogPage.belongsTo(CreateBlogId, { foreignKey: 'blogId' });

export default SEOBlogPage;
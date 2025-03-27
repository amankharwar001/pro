import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const BlogActivate = sequelize.define('BlogActivate', {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'draft', 
    },
}, {
    tableName: 'blog_activation', 
    timestamps: true,
});

export default BlogActivate;

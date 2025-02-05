
import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const BlogPageHeading = sequelize.define('BlogPageHeading', {
    headingName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'BlogPage_heading', // Ensure this matches your table name exactly
    timestamps: true,
});

export default BlogPageHeading;
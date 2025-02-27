import { DataTypes } from 'sequelize';
import sequelize from '../../db/dbConnect.js';

const Testimonial = sequelize.define('HomeTestimonial', {
    heading: {
        type: DataTypes.STRING,
        allowNull: false,  // Ensuring the heading field is required
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,  // Ensuring the heading field is required
    },
    info: {
        type: DataTypes.TEXT,
        allowNull: false,  // Ensuring the button field is required
    },
}, {
    tableName: 'homepage_testimonial',  // Ensure this matches your table name exactly
    timestamps: true,
});
export default Testimonial;
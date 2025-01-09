import ContactForm from "@/models/contactPage/ContactForm";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        name,
        designation,
        companyName,
        address,
        city,
        country,
        state,
        pinCode,
        phone,
        email,
        enquiryType,
        queryComment,
      } = req.body;

      if (!name || !designation || !companyName || !address || !city || !country || !state || !pinCode || !phone || !email || !enquiryType || !queryComment) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Create a new entry in the database
      const newSubmission = await ContactForm.create({
        name,
        designation,
        companyName,
        address,
        city,
        country,
        state,
        pinCode,
        phone,
        email,
        enquiryType,
        queryComment,
      });

      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: process.env.EMAIL_NAME, // Add these to .env file
          pass: process.env.EMAIL_PASS,
        }
    });

      // Email content
      const mailOptions = {
        // from: process.env.CLIENT_EMAIL, // Sender email
        // to: process.env.CLIENT_EMAIL, // Recipient email (client)
        from: '"Partner Contact Form" <no-reply@yourapp.com>',
        to: "your-email@example.com", // Replace with the recipient's email
        subject: `New Contact Form Submission - ${name}`,
        text: `
          A new contact form has been submitted.

          Name: ${name}
          Designation: ${designation}
          Company Name: ${companyName}
          Address: ${address}
          City: ${city}
          State: ${state}
          Country: ${country}
          Pin Code: ${pinCode}
          Phone: ${phone}
          Email: ${email}
          Enquiry Type: ${enquiryType}
          Query/Comment: ${queryComment}
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return res.status(201).json({
        message: 'Form submitted successfully and email sent.',
        data: newSubmission,
      });
    } catch (error) {
      console.error('Error saving data or sending email:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}









// Anonymous Mail Services
// Kuch services anonymous email send karne ki permission deti hain, lekin ye practice secure nahi hoti.

// Aap libraries jaise nodemailer-smtp-transport ko configure kar sakte hain:

// javascript
// Copy code
// const transporter = nodemailer.createTransport({
//   host: 'smtp.example.com',
//   port: 25, // Open SMTP port
//   secure: false,
//   tls: {
//     rejectUnauthorized: false,
//   },
// });







import AdminModel from "@/models/AdminModel";
import ContactForm from "@/models/contactPage/ContactForm";
import LeadFormEmail from "@/models/formEmail/Email";
import nodemailer from "nodemailer";





export default async function handler(req, res) {
  if (req.headers['x-system-key'] !== process.env.NEXT_PUBLIC_SYSTEM_KEY) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
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
      const admin = await AdminModel.findOne();
      const adminEmail = admin.email;
       // Fetch the email and password from the LeadFormEmail model (database)
       const leadFormEmailData = await LeadFormEmail.findOne(); // Adjust query if necessary (e.g., filtering based on conditions)

       if (!leadFormEmailData) {
         return res.status(500).json({ error: 'Email configuration not found in database' });
       }
 
       const { email: emailUser, password } = leadFormEmailData;

      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure:true,
        port:465,
        auth: {
          user: emailUser, // Add these to .env file
          pass: password,
        }
    });


      const mailOptions = {
        from: '"Partner Contact Form" <no-reply@yourapp.com>', // Sender's email address
        to: `${adminEmail}`, // Replace with your own email address
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




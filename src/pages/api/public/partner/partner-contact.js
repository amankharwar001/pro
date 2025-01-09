



import PartnerContactForm from "@/models/partnerPage/PartnerContactForm";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      name,
      contactNo,
      email,
      companyName,
      designation,
      city,
      state,
      partnerType,
      query,
      authorization,
    } = req.body;

    try {
      // Validate input
      if (!name || !contactNo || !email || !partnerType || !query || authorization === undefined) {
        return res.status(400).json({ error: "All required fields must be filled." });
      }

      // Create new contact entry
      const contact = await PartnerContactForm.create({
        name,
        contactNo,
        email,
        companyName,
        designation,
        city,
        state,
        partnerType,
        query,
        authorization,
      });

      // Nodemailer transporter configurati on
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: process.env.EMAIL_NAME, // Add these to .env file
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email content
      const mailOptions = {
        from: '"Partner Contact Form" <no-reply@yourapp.com>',
        to: "your-email@example.com", // Replace with the recipient's email
        subject: "New Partner Contact Form Submission",
        text: `A new partner contact form has been submitted:
        
        Name: ${name}
        Contact No: ${contactNo}
        Email: ${email}
        Company Name: ${companyName}
        Designation: ${designation}
        City: ${city}
        State: ${state}
        Partner Type: ${partnerType}
        Query: ${query}
        Authorization: ${authorization ? "Yes" : "No"}`,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return res.status(201).json({
        message: "Form submitted successfully. Notification email sent.",
        contact,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}

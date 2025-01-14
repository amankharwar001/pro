



import PartnerContactForm from "@/models/partnerPage/PartnerContactForm";
import nodemailer from "nodemailer";
import LeadFormEmail from "@/models/formEmail/Email";

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
       // Fetch the email and password from the LeadFormEmail model (database)
       const leadFormEmailData = await LeadFormEmail.findOne(); // Adjust query if necessary (e.g., filtering based on conditions)

       if (!leadFormEmailData) {
         return res.status(500).json({ error: 'Email configuration not found in database' });
       }
 
       const { email: emailUser, password } = leadFormEmailData;


      // Nodemailer transporter configurati on
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure:true,
        port:465,
        auth: {
          user: emailUser, // Add these to .env file
          pass: password,
        }
      });

      // Email content
      const mailOptions = {
        from: '"Partner Contact Form" <no-reply@yourapp.com>',
        to: `${email}`, // Replace with the recipient's email
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


import nodemailer from 'nodemailer';
import dotnenv from "dotenv"



dotnenv.config()

// Controller function to send an email
export const sendEmail = async (req, res) => {
  const { email } = req.body; // Extract email from request body

  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Replace with your Gmail address
      pass: process.env.EMAIL_PASS ,  // Replace with your Gmail app-specific password
    },
  });

  // Configure the email options
  const mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to: email, // Receiver address (user email)
    subject: 'Thank you for subscribing!', // Subject line
    text: 'You have successfully subscribed to the LearnLedger Newsletter!', // Plain text body
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
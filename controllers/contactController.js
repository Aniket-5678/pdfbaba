import Contact from "../models/contact.model.js";


export const submitContactForm = async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
  
      // Create a new contact document
      const newContact = new Contact({
        name,
        email,
        subject,
        message
      });
  
      // Save to the database
      await newContact.save();
  
      // Respond with success
      res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully'
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };
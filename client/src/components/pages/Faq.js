import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a context to manage theme

const Faq = () => {
  const faqData = [
    {
      question: "What is PDFBaba?",
      answer: "PDFBaba is a platform where you can directly access and download a variety of educational PDFs, including Board question papers, course PDFs, and more, without needing to create an account."
    },
    {
      question: "How can I download the PDFs?",
      answer: "Simply click on the download link for any PDF to access and download it. No payment or subscription is required for free PDFs."
    },
    {
      question: "What PDFs are available?",
      answer: "We provide a wide range of educational PDFs, including Maharashtra Board HSC, CBSE question papers, and various course materials, all available for direct access and download."
    },
    {
      question: "Do I need an account to access the PDFs?",
      answer: "No, you don't need to create an account to download PDFs. You can access all the available PDFs without logging in."
    },
    {
      question: "Is the content updated regularly?",
      answer: "Yes, our content is updated regularly to ensure you have access to the most recent educational materials."
    },
    {
      question: "How do I contact support?",
      answer: "If you need assistance, you can contact us through the 'Contact Us' section on the website or via our support email."
    }
  ];

  const [theme] = useTheme(); // Use the theme context to get the current theme

  return (
    <Box sx={{
      margin: '40px auto',
      padding: '30px',
      maxWidth: '900px',
      backgroundColor: theme === 'dark' ? '#121212' : '#f9f9f9', // Dark or light background
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      fontFamily: "'Poppins', sans-serif",
      color: theme === 'dark' ? '#f5f5f5' : '#333', // Adjust text color
    }}>
      <Typography variant="h4" gutterBottom sx={{
        textAlign: 'center',
        color: theme === 'dark' ? '#f5f5f5' : '#333', // Adjust title color
        fontWeight: 500,
        letterSpacing: '0.5px',
        fontSize: '1.5rem'
      }}>FAQs</Typography>
      {faqData.map((faq, index) => (
        <Accordion key={index} sx={{
          marginBottom: '12px',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          },
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff', // Dark or light background for accordion
        }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: theme === 'dark' ? '#f5f5f5' : '#1976d2' }} />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
              borderBottom: '1px solid #ddd',
              '&:hover': {
                backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0'
              }
            }}
          >
            <Typography variant="h6" sx={{
              color: theme === 'dark' ? '#f5f5f5' : '#444',
              fontWeight: 500,
              fontSize: '18px',
              letterSpacing: '0.2px',
              fontFamily: "'Poppins', sans-serif",
            }}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{
            backgroundColor: theme === 'dark' ? '#2c2c2c' : '#fafafa',
            borderTop: '1px solid #ddd',
            padding: '20px',
            fontFamily: "'Poppins', sans-serif",
          }}>
            <Typography sx={{
              color: theme === 'dark' ? '#e0e0e0' : '#555',
              fontSize: '16px',
              lineHeight: '1.6',
              fontWeight: 400,
            }}>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Faq;

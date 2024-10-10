import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from "../Layout/Layout"
import toast from 'react-hot-toast';
import "../style/style.css"
import { ClipLoader } from 'react-spinners';

const QuestionpaperDetails = () => {

    const { id } = useParams();
    const [questionPaper, setQuestionPaper] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchQuestionPaper = async () => {
        try {
          const { data } = await axios.get(`/api/v1/questionpaper/question/${id}`);
          if (data.success) {
            setQuestionPaper(data.data);
          } else {
            toast.error('Failed to fetch question paper');
          }
        } catch (error) {
          toast.error('Error fetching question paper');
        }finally{
          setTimeout(() => {
            setLoading(false);
          }, 1000); // Adjust the delay as needed (1000ms = 1 second)
        }
        
      };
  
      fetchQuestionPaper();
    }, [id]);
  
    if (loading) {
      return (
        <div className="spinner-container">
          <ClipLoader color="#007bff" size={50} /> {/* Spinner Color and Size */}
        </div>
      );
    }

  return (
    <Layout>
    <div className='question-paper-details'>
      <h1>{questionPaper.name}</h1>
      <p>{questionPaper.description}</p>
      <h3>PDFs:</h3>
      <ul>
        {questionPaper.pdfs.map((pdf, index) => (
          <li key={index}>
            <a href={pdf} target="_blank" rel="noopener noreferrer">
              View PDF {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
  )
}

export default QuestionpaperDetails
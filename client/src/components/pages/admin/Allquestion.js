import React, {useState, useEffect} from 'react'
import Layout from '../../Layout/Layout'
import axios from 'axios';
import "../../style/style.css"
import Adminmenu from '../Adminmenu';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Allquestion = () => {


    const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get('/api/v1/questionpaper/all-questions');
        if (data.success) {
          setQuestions(data.data);
        } else {
          console.error('Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error fetching questions', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/questionpaper/delete-question/${id}`);
      if (data.success) {
        setQuestions(questions.filter(question => question._id !== id));
        toast.success("Deleted successfully");
      } else {
        console.error('Failed to delete question paper');
      }
    } catch (error) {
      console.error('Error deleting question paper', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <div className='all-questions-container'>
        <div>
          <Adminmenu />
        </div>
        <h3>All Question Papers</h3>
        <ul>
          {questions.map((question) => (
            <li key={question._id}>
              <h4>{question.name}</h4>
              <p>{question.description}</p>
              <div className="pdf-list">
                {question.pdfs.map((pdfUrl, index) => (
                  <div key={index} className="pdf-item">
                    <h5>PDF {index + 1}</h5>
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                      <button className='view-pdf' >View PDF</button>
                    </a>
                  </div>
                ))}
              </div>
              <button className='edit-btn' onClick={() => navigate(`/dashboard/admin/update-question/${question._id}`)}>
                edit
              </button>
              <button  className='delete-btn' onClick={() => handleDelete(question._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default Allquestion
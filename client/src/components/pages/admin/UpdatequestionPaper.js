import React,{useState, useEffect} from 'react'
import Layout from '../../Layout/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Adminmenu from '../Adminmenu';
import toast from 'react-hot-toast';
import "../../style/style.css"



const Updatequestionpaper = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [existingPdfs, setExistingPdfs] = useState([]);
    const [newPdfs, setNewPdfs] = useState([]);

    // Fetch existing question paper details
    useEffect(() => {
        const fetchQuestionPaper = async () => {
            try {
                const { data } = await axios.get(`/api/v1/questionpaper/question/${id}`);
                if (data.success) {
                    setName(data.data.name);
                    setDescription(data.data.description);
                    setExistingPdfs(data.data.pdfs); // Update this line to fetch existing PDFs
                } else {
                    console.error('Failed to fetch question paper');
                }
            } catch (error) {
                console.error('Error fetching question paper', error);
            }
        };

        fetchQuestionPaper();
    }, [id]);

    // Handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        // Append existing PDFs
        existingPdfs.forEach(pdf => {
            formData.append('existingPdfs', pdf);
        });

        // Append new PDFs
        for (let i = 0; i < newPdfs.length; i++) {
            formData.append('newPdfs', newPdfs[i]);
        }

        try {
            const { data } = await axios.put(`/api/v1/questionpaper/update-question/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (data.success) {
                navigate('/dashboard/admin/all-question');
                toast.success("Update successful");
            } else {
                console.error('Failed to update question paper');
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error('Error updating question paper', error);
        }
    };

    const handleFileChange = (e) => {
        setNewPdfs(e.target.files);
    };



  return (
    <Layout>
    <div className='update-question-container'>
        <div>
            <Adminmenu />
        </div>
        <h3>Update Question Paper</h3>
        <form onSubmit={handleUpdate}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type='text'
                    value={name}
                    placeholder='Enter name'
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    placeholder='Enter description'
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="pdf">Upload PDFs</label>
                <input
                    id="pdf"
                    type='file'
                    accept='application/pdf'
                    onChange={handleFileChange}
                    multiple
                />
            </div>
            <div className="form-group">
                <label>Existing PDFs</label>
                <ul>
                    {existingPdfs.map((pdf, index) => (
                        <li key={index}>
                            <a href={pdf} target="_blank" rel="noopener noreferrer">
                                View PDF {index + 1}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <button type='submit'>Update</button>
        </form>
    </div>
</Layout>
  )
}

export default Updatequestionpaper
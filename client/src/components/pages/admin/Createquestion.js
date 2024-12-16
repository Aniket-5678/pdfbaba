import React,{useState , useEffect} from 'react'
import Layout from "../../Layout/Layout"
import axios from "axios"
import toast from "react-hot-toast"
import Adminmenu from '../Adminmenu'
import {Select} from "antd"
import { useNavigate } from 'react-router-dom';
import "../../style/style.css"
const {Option} = Select



const Createquestion = () => {


  const [categories, setCategories] = useState([])
    const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pdfs, setPdfs] = useState([]);
  const navigate = useNavigate();
  const [category, setCategory] = useState("")



  const getAllcategories = async() => {
    try {
       const {data} = await axios.get('/api/v1/category/get-category')
       if (data?.success) {
          setCategories(data?.category)
       }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong while getting categories')
    }
  }

useEffect(()=> {
 getAllcategories()
},[])



  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPdfs(prevFiles => [...prevFiles, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append("category", category)

    for (let i = 0; i < pdfs.length; i++) {
      formData.append('pdfs', pdfs[i]);
    }

    try {
      const { data } = await axios.post('/api/v1/questionpaper/create-question', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data.success) {
        toast.success(data.message);
        setName('');
        setDescription('');
        setPdfs([]);
        navigate('/dashboard/admin/all-question');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error creating question paper');
    }
  };


  return (
    <Layout>
    <div className='create-question-container'>
      <div>
        <Adminmenu />
      </div>
      <h3>Create Question Paper</h3>
      <form onSubmit={handleSubmit}>
      
      <div>
      <Select className='select-category' bordered={false} placeholder="select category" showSearch onChange={(value) => {setCategory(value)}}>
                      {categories?.map((c)=> (
                        <Option key={c._id} value={c._id}>{c.name}</Option>
                      ))}   
                    </Select>
      </div>




        <input
          type='text'
          value={name}
          placeholder='Enter name'
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          value={description}
          placeholder='Enter description'
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type='file'
          accept='application/pdf'
          onChange={handleFileChange}
          multiple
          required
        />
        <button type='submit'>Create</button>
      </form>
    </div>
  </Layout>
  )
}

export default Createquestion
import React,{useState, useEffect} from 'react'
import Layout from "../../Layout/Layout"
import Adminmenu from '../../pages/Adminmenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import "../../style/style.css"
import Categoryform from '../../form/Categoryform'
import {Modal} from "antd"



const CreateCategory = () => {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedname, setUpdatedname] = useState("")
  
  
    const handleSubmit = async(e) => {
  
    e.preventDefault()
    try {
       
      const {data} = await axios.post('/api/v1/category/create-category', {name})
      if (data?.success) {
         toast.success(`${name} is created`)
         getAllCategory()
      }else{
        toast.error(data.message)
      }
  
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
  
    }
  
  
  const getAllCategory = async() => {
    try {
        const {data} = await axios.get('/api/v1/category/get-category')
        if (data?.success) {
           setCategories(data?.category)
        }
  
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while getting categories")
    }
  }
  
  useEffect(()=> {
    getAllCategory()
  }, [])
  
  
  const handleUpdate = async(e) => {
    e.preventDefault()
     try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}` , {name: updatedname})
      if (data.success) {
          toast.success(`${updatedname} is created`)
          setSelected(null)
          setUpdatedname("")
          setVisible(false)
          getAllCategory()
      }else{
        toast.error(data.message)
      }
     } catch (error) {
      console.log(error);
      toast.error("something went wrong")
     }
  }
  
  
  const handleDelete = async(pId) => {
     try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${pId}`)
      if (data.success) {
          toast.success( `category is deleted`)
  
          getAllCategory()
      }else{
        toast.error(data.message)
      }
     } catch (error) {
      console.log(error);
      toast.error("something went wrong")
     }
  }




  return (
    <Layout>
    <div className='CreateCategory-container'>
      <div>
      <Adminmenu/>
      </div>
      <div className='createCategory-content'>
       <h3 className='heading'>Manage category</h3>
       <div>
        <Categoryform  handleSubmit={handleSubmit} value={name} setValue={setName}/>
       </div>
       <div >
        <table className='All-main'>
          <thead >
            <tr >
              <th>Name</th>
            </tr>
          </thead>
          <tbody className='All-category'>
            <tr>
            {categories?.map((c)=> (
              <div className='category-name'>
                
                <td key={c._id}>{c.name}</td>
                  <button className='edit-btn' onClick={()=> {setVisible(true) ; setUpdatedname(c.name); setSelected(c) }}>Edit</button>
                  <button className='delete-btn' onClick={()=> {handleDelete(c._id)}}>Delete</button>
                
              </div>
            ))}
            </tr>
          </tbody>
        </table>
       </div>
        <Modal  onCancel={() => setVisible(false) } footer={null} visible={visible} >
          <Categoryform  value={updatedname} setValue={setUpdatedname} handleSubmit={handleUpdate}/>
        </Modal>
      </div>
    </div>
  
      </Layout>
  )
}

export default CreateCategory
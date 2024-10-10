import React,{useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = ({path= "login"}) => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()
    
    
    useEffect(()=> {
      
        const interval = setInterval(()=> {
            setCount((prevalue)=> --prevalue )
        }, 1000)
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return ()=> clearInterval(interval)
     }, [count, navigate, location, path])


  return (
    <div>
        <div>
            <h3>redirecting to you in {count} second</h3>
            <h2>Loading...</h2>
        </div>
    </div>
  )
}

export default Spinner
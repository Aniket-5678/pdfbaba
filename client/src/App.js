import {Routes, Route} from "react-router-dom"
import './App.css';
import HomePage from "./components/pages/HomePage";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import PrivateRoutes from "./components/Routes/PrivateRoutes";
import Dashboard from "./components/pages/user/Dashboard";
import AdminRoutes from "./components/Routes/AdminRoutes";
import Admindashboard from "./components/pages/admin/Admindashboard";
import Createquestion from "./components/pages/admin/Createquestion";
import Allquestion from "./components/pages/admin/Allquestion";
import Updatequestionpaper from "./components/pages/admin/UpdatequestionPaper";
import QuestionpaperDetails from "./components/pages/QuestionpaperDetails";
import Aboutus from "./components/pages/Aboutus";
import Contact from "./components/pages/Contact";
import Forgetpass from "./components/pages/Forgetpass";
import NotFoundComponent from "./components/pages/NotFoundComponent";
import ExplorePage from "./components/pages/ExplorePage";
import { useTheme } from "./components/context/ThemeContext";



function App() {

const [theme] = useTheme()

  return (
    <div className="App">
      <div id={theme}>
      <Routes>
        <Route path="/" element={ <HomePage/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgetpass" element={<Forgetpass/>} />
        <Route path="/question/:id" element={<QuestionpaperDetails/>} />
        <Route path="/about" element={<Aboutus/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/explore" element={<ExplorePage/>} />
        <Route path="*" element={<NotFoundComponent/>} />

         
         <Route path="/dashboard" element={<PrivateRoutes/>} >
          <Route path="user" element={<Dashboard/>} /> 

         </Route>
         


         <Route path="/dashboard" element={<AdminRoutes/>} >
          <Route path="admin" element={<Admindashboard/>} /> 
          <Route path="admin/create-question" element={<Createquestion/>} /> 
          <Route path="admin/all-question" element={<Allquestion/>} /> 
          <Route path="admin/update-question/:id" element={<Updatequestionpaper/>} /> 

         </Route>





       </Routes>
      </div>
      
    </div>
  );
}

export default App;



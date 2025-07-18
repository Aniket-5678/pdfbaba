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
import  CreateCategory  from './components/pages/admin/CreateCategory'
import CategoryProduct from "./components/pages/CategoryProduct";
import Howsearchworks from "./components/pages/Howsearchworks";
import Categoryworks from "./components/pages/Categoryworks";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermCondition from "./components/pages/TermCondition";
import Discovermore from "./components/pages/Discovermore";
import  { Toaster } from 'react-hot-toast';
import ServiceList from "./components/pages/ServiceList";
import CreateQuiz from "./components/pages/admin/CreateQuiz";
import QuizList from "./components/pages/admin/QuizList";
import QuizPlayList from "./components/pages/QuizPlayList";
import PlayQuiz from "./components/pages/PlayQuiz";
import CreateRoadmap from "./components/pages/admin/CreateRoadmap";
import RoadmapList from "./components/pages/admin/RoadmapList";
import UpdateRoadmap from "./components/pages/admin/UpdateRoadmap";
import Roadmap from "./components/pages/Roadmap";
import RoadmapDetail from "./components/pages/RoadmapDetail";
import DomainSearch from "./components/pages/DomainSearch";




function App() {

const [theme] = useTheme()

  return (
    <div className="App">
      <Toaster/>
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
        <Route path="/category/:slug" element={<CategoryProduct/>} />
        <Route path="/howitworks"  element={<Howsearchworks/>} />
        <Route path="/categoryworks" element={<Categoryworks/>} />
       <Route path="/privacy" element={<PrivacyPolicy/>} />
       <Route path="/termcondition" element={<TermCondition/>} />
       <Route path="/discover-more"  element={<Discovermore/>} />
       <Route path="/service" element={<ServiceList/>} />
       <Route path="/quizplaylist" element={<QuizPlayList/>}/>
       <Route path="/play/:id" element={<PlayQuiz/>} />
       <Route path="/roadmapdata" element={<Roadmap/>} />
       <Route path="/roadmap/:id" element={<RoadmapDetail/>} />
       <Route path="/domain-suggestor" element={<DomainSearch/>}/>
         
         <Route path="/dashboard" element={<PrivateRoutes/>} >
          <Route path="user" element={<Dashboard/>} /> 

         </Route>
         


         <Route path="/dashboard" element={<AdminRoutes/>} >
          <Route path="admin" element={<Admindashboard/>} /> 
          <Route path="admin/create-question" element={<Createquestion/>} /> 
          <Route path="admin/all-question" element={<Allquestion/>} /> 
          <Route path="admin/update-question/:id" element={<Updatequestionpaper/>} /> 
          <Route path="admin/create-category" element={<CreateCategory/>} /> 
          <Route path="admin/create-quiz" element={<CreateQuiz/>} /> 
          <Route path="admin/all-quiz" element={<QuizList/>} /> 
          <Route path="admin/createroadmap" element={<CreateRoadmap/>} />
          <Route path="admin/roadmaplist" element={<RoadmapList/>} />
          <Route path="admin/update/:id" element={<UpdateRoadmap/>} />
         </Route>





       </Routes>
      </div>
      
    </div>
  );
}

export default App;



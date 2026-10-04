import NotesLibrary, { NoteDetail } from "./components/pages/NotesLibrary";
import NotesWorkspace from "./components/pages/admin/NotesWorkspace";
import CreateCategory from "./components/pages/admin/CreateCategory";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Seo from "./components/Seo";
import LearningCategories, {
  LearningPage,
} from "./components/pages/LearningCategories";
import Layout from "./components/Layout/Layout";
import HomePage from "./components/pages/HomePage";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import PrivateRoutes from "./components/Routes/PrivateRoutes";
import Dashboard from "./components/pages/user/Dashboard";
import AdminRoutes from "./components/Routes/AdminRoutes";
import Admindashboard from "./components/pages/admin/Admindashboard";
import Aboutus from "./components/pages/Aboutus";
import Contact from "./components/pages/Contact";
import Forgetpass from "./components/pages/Forgetpass";
import NotFoundComponent from "./components/pages/NotFoundComponent";
import { useTheme } from "./components/context/ThemeContext";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermCondition from "./components/pages/TermCondition";
import { Toaster } from "react-hot-toast";
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
import AdminCreateSourceCode from "./components/pages/admin/AdminCreateSourceCode";
import ServiceDetails from "./components/pages/ServiceDetails";
import SourceCodeBuyNow from "./components/pages/SourceCodeBuyNow";
import SuccessPayment from "./components/pages/SuccessPayment";
import SourceCodeOrder from "./components/pages/SourceCodeOrder";
import AdminSourceCodeUpdateDelete from "./components/pages/admin/AdminSourceCodeUpdateDelete";
import AdminUserSourceCodeOrder from "./components/pages/admin/AdminUserSourceCodeOrder";

function App() {
  const [theme] = useTheme();

  return (
    <div className="App">
      <Toaster />
      <Seo />
      <div id={theme}>
        <Routes>
          <Route
            path="/categories"
            element={
              <Layout>
                <LearningCategories standalone />
              </Layout>
            }
          />
          <Route path="/learn/:topic" element={<LearningPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesLibrary />} />
          <Route path="/notes-category/:category" element={<NotesLibrary />} />
          <Route path="/note/:slug" element={<NoteDetail />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpass" element={<Forgetpass />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFoundComponent />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/termcondition" element={<TermCondition />} />
          <Route path="/service" element={<ServiceList />} />
          <Route path="/practice-quiz" element={<QuizPlayList />} />
          <Route path="/play/:id" element={<PlayQuiz />} />
          <Route path="/exam-roadmap" element={<Roadmap />} />
          <Route path="/roadmap/:id" element={<RoadmapDetail />} />
          <Route path="/domain-suggestor" element={<DomainSearch />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/sourcecode/buy/:id" element={<SourceCodeBuyNow />} />
          <Route path="/success/:id" element={<SuccessPayment />} />
          <Route path="/sourcecode-order" element={<SourceCodeOrder />} />
          <Route path="/dashboard" element={<PrivateRoutes />}>
            <Route path="user" element={<Dashboard />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoutes />}>
            <Route path="admin" element={<Admindashboard />} />
            <Route path="admin/notes" element={<NotesWorkspace create />} />
            <Route path="admin/notesmanage" element={<NotesWorkspace />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-quiz" element={<CreateQuiz />} />
            <Route path="admin/all-quiz" element={<QuizList />} />
            <Route path="admin/createroadmap" element={<CreateRoadmap />} />
            <Route path="admin/roadmaplist" element={<RoadmapList />} />
            <Route path="admin/update/:id" element={<UpdateRoadmap />} />
            <Route
              path="admin/sourcecode"
              element={<AdminCreateSourceCode />}
            />
            <Route
              path="admin/sourcecodeupdatedelete"
              element={<AdminSourceCodeUpdateDelete />}
            />
            <Route
              path="admin/usersourcecodeorder"
              element={<AdminUserSourceCodeOrder />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

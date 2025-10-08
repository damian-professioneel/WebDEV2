import { Routes, Route } from "react-router-dom";
import { LoginForm } from './Login'
import { IndexTest } from './HomePage';
import { LessonTable } from './Lesson';
import { FieldsTable } from "./Fields";
import { Teachers } from "./Teachers";
import { PadelInfo } from "./PadelInfo";
import { TennisInfo } from "./TennisInfo";
import Navbar from './NavBar';
import Footer from './Footer';
import './FrontendCSS/minimal-styles.css';
import './FrontendCSS/homePage.css';
import './FrontendCSS/Footer.css';

const App = () => {
  return (

    <div className="app-layout"> 
      <Navbar/>
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<IndexTest />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path='/lessons' element={<LessonTable/>} />
          <Route path="/fields" element={<FieldsTable/>}/>
          <Route path='/teachers' element={<Teachers/>} />
          <Route path='/padelInfo' element={<PadelInfo/>}/>
          <Route path='/tennisInfo' element={<TennisInfo/>}/>
        </Routes>
      </main>
      
      <Footer/>
    </div>
  );
};

export default App

import { Routes, Route } from "react-router-dom";
import { LoginForm } from './Login'
import { IndexTest } from './HomePage';
import { LessonTable } from './Lesson';
import { Teachers } from "./Teachers";
import Navbar from './NavBar';
import './FrontendCSS/minimal-styles.css';
import './FrontendCSS/homePage.css';

function App() {

  return (
    <div style={{
      width: '100%',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <Navbar/>
    <Routes>
      <Route path="/" element={<IndexTest />} />
      <Route path="/login" element={<LoginForm />} />   
      <Route path='/lessons' element={<LessonTable/>} />
      <Route path='/teachers' element={<Teachers/>} />
    </Routes>
    </div>    
  )
}

export default App

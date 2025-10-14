import { Routes, Route } from "react-router-dom";
import { LoginForm } from './Login'
import { IndexTest } from './HomePage';
import { LessonTable } from './Lesson';
import { FieldsTable } from "./Fields";
import { Teachers } from "./Teachers";
import { PadelInfo } from "./PadelInfo";
import { TennisInfo } from "./TennisInfo";
import  Footer  from "./Footer";
import Navbar from './NavBar';
import './FrontendCSS/minimal-styles.css';
import './FrontendCSS/homePage.css';
import './FrontendCSS/Footer.css';
import './FrontendCSS/Teachers.css';
import { useEffect, useState } from "react";
import Trainings from "./Trainings";


const App = () => {
  const [role, setRole] = useState<"admin" | "member" | "teacher" | "">("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role") as "admin" | "member" | "teacher" | null;
    if (storedRole) setRole(storedRole);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',  // full viewport height
      width: '100%',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
    }}>
      <Navbar role={role} setRole={setRole} />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<IndexTest />} />
          <Route path="/login" element={<LoginForm setRole={setRole} />} />   
          <Route path='/lessons' element={<LessonTable/>} />
          <Route path="/fields" element={<FieldsTable/>}/>
          <Route path='/teachers' element={<Teachers/>} />
          <Route path='/training' element={<Trainings/>} />
          <Route path='/padelInfo' element={<PadelInfo/>}/>
          <Route path='/tennisInfo' element={<TennisInfo/>}/>
        </Routes>
      </div>

      <Footer />
    </div>   
  )
}

export default App;

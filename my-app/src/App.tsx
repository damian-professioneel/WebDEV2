import { Routes, Route } from "react-router-dom";
import { LoginForm } from './Login'
import { IndexTest } from './HomePage';
import { LessonTable } from './Lesson';
import { FieldsTable } from "./Fields";
import { Teachers } from "./Teachers";
import { PadelInfo } from "./PadelInfo";
import { TennisInfo } from "./TennisInfo";
import Trainings  from "./Trainings";
import Navbar from './NavBar';
import Footer from './Footer';
import './FrontendCSS/minimal-styles.css';
import './FrontendCSS/homePage.css';
import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavBar";
import MemberNavbar from "./MemberNavBar";
import TeacherNavbar from "./TeacherNavBar";

function App() {
  const [role, setRole] = useState<"admin" | "member" | "teacher" | "">("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role") as "admin" | "member" | "teacher" | null;
    if (storedRole) setRole(storedRole);
  }, []);

  return (
    <div style={{
      width: '100%',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {role === "admin" && <AdminNavbar />}
      {role === "teacher" && <TeacherNavbar />}
      {role === "member" && <MemberNavbar />}
      {!role && <MemberNavbar />}
    <Routes>
      <Route path="/" element={<IndexTest />} />
      <Route path="/login" element={<LoginForm setRole={setRole} />} />   
      <Route path='/lessons' element={<LessonTable/>} />
      <Route path="/fields" element={<FieldsTable/>}/>
      <Route path='/teachers' element={<Teachers/>} />
      <Route path='/padelInfo' element={<PadelInfo/>}/>
      <Route path='/tennisInfo' element={<TennisInfo/>}/>
      <Route path='/trainings' element={<Trainings/>}/>
    </Routes>
    </div>    
  )
}

export default App

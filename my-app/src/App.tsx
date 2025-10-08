import { Routes, Route } from "react-router-dom";
import { LoginForm } from './Login'
import { IndexTest } from './HomePage';
import { LessonTable } from './Lesson';
<<<<<<< HEAD
import { FieldsTable } from "./Fields";
=======
import { Teachers } from "./Teachers";
import { Fields } from "./Fields";
import { PadelInfo } from "./PadelInfo";
import { TennisInfo } from "./TennisInfo";
>>>>>>> 8f0112e15b0258261642ee215ca6444b0c98e19e
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
<<<<<<< HEAD
      <Route path="/fields" element={<FieldsTable/>}/>
=======
      <Route path='/teachers' element={<Teachers/>} />
      <Route path='/fields' element={<Fields/>}/>
      <Route path='/padelInfo' element={<PadelInfo/>}/>
      <Route path='/tennisInfo' element={<TennisInfo/>}/>
>>>>>>> 8f0112e15b0258261642ee215ca6444b0c98e19e
    </Routes>
    </div>    
  )
}

export default App

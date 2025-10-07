import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { LoginForm } from './Login'
import { IndexTest } from './HomePage';
import { LessonTable } from './Lesson';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<IndexTest />} />
      <Route path="/login" element={<LoginForm />} />   
      <Route path='/lessons' element={<LessonTable/>} />
    </Routes>
    </>
  )
}

export default App

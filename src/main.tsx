import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Courses/components/Login/Login.tsx';
import Registration from './components/Courses/components/Registration/Registration.tsx';
import Courses from './components/Courses/Courses.tsx';
import CourseInfo from './components/CourseInfo/CourseInfo.tsx';
import CreateCourse from './components/Courses/components/CreateCourse/CreateCourse.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:courseId' element={<CourseInfo />} />
        <Route path='/courses/add' element={<CreateCourse />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import *  as  classesApi from '../../utilities/class-api';
import ClassPage from '../ClassPage/ClassPage'
import MainPage from '../MainPage/MainPage';

export default function App() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function fetchClasses() {
      const classData = await classesApi.getClasses();
      setClasses(classData);
    }
    fetchClasses();
  }, []);

  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} classes={classes} />
            <Routes>
              {/* Route components in here */}
              <Route path='/classes/:id' element={<ClassPage classes={classes} />} />
              <Route path="/" element={<MainPage classes={classes} />} />
            </Routes>
            
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}

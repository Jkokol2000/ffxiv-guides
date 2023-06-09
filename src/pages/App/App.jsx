import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import *  as  classesApi from '../../utilities/class-api';
import ClassPage from '../ClassPage/ClassPage'
import MainPage from '../MainPage/MainPage';
import GuidePage from '../GuidePage/GuidePage';
import Account from '../Account/Account';
import CreateGuide from '../CreateGuide/CreateGuide';

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
              <Route path='/classes/:id' element={<ClassPage user={user} />} />
              <Route path='/guides/:id' element={<GuidePage user={user} />} />
              <Route path="/" element={<MainPage classes={classes} />} />
              <Route path='/accounts/:id' element={<Account setUser={setUser} user={user} />} />
              <Route path='/create/:classid' element={<CreateGuide user={user} />} />
              <Route path='/edit/:guideid' element={<CreateGuide user={user} />} />
            </Routes>
            
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}

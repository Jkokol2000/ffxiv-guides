import { useState, useEffect } from 'react';
import ClassForm from '../../components/ClassForm/ClassForm'
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import *  as  classesApi from '../../utilities/class-api'



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
            <NavBar user={user} setUser={setUser} classes = {classes}/>
            <Routes>
              {/* Route components in here */}
              <Route path="/classes" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
      <div className="classes-container">
        {classes.map((c) => (
          <button key={c._id}>{c.name}</button>
        ))}
      </div>
      <ClassForm />
    </main>
  );
}
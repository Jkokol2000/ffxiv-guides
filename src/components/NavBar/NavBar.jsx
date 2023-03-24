import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';
import { getClasses } from '../../utilities/class-api'

export default function NavBar({ user, setUser }) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function fetchClasses() {
      const classData = await getClasses();
      setClasses(classData);
    }
    fetchClasses();
  }, []);
  
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <div className="dropdown">
        <button className="dropbtn">Classes</button>
        <div className="dropdown-content">
        {classes.map((classItem) => (
            <Link key={classItem._id} to={`/classes/${classItem.name}`}>
              {classItem.name}
            </Link>
          ))}
        </div>
      </div>
      &nbsp;&nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}

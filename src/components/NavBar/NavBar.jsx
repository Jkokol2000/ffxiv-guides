import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';


export default function NavBar({ user, setUser, classes }) {
  
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
            <Link key={classItem._id} to={`/classes/${classItem._id}`}>
              {classItem.name}
            </Link>
          ))}
        </div>
      </div>
      |
      <button className="dropbtn"><Link to={'/'}>Home</Link></button>
      &nbsp;&nbsp;
      <span>Welcome, <Link to={`/accounts/${user._id}`}>{user.name}</Link></span>
      &nbsp;&nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}

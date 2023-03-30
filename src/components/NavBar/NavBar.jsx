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
      <Link to={'/'}>Home</Link>
      <span>Welcome, <Link to={`/accounts/${user._id}`}>{user.name}</Link></span>
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}

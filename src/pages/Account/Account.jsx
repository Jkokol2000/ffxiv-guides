import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as GuideApi from '../../utilities/guide-api';
import './Account.css';

export default function Account({ user }) {
  const [guides, setGuides] = useState([]);
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const guideResponse = await GuideApi.getGuidesForUser(user._id);
        setGuides(guideResponse);
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [id, user]);

  async function handleDeleteGuide(id) {
    if (window.confirm('Are you sure you want to delete this guide?')) {
      await GuideApi.deleteGuide(id);
      const guideResponse = await GuideApi.getGuidesForUser(user._id);
      setGuides(guideResponse);
    }
  }

  return (
<main class="Account">
  {user ? (
    <div>
      <h1 class="account-title">{userData.name}</h1>
      <h2 class="account-subtitle">{userData.email}</h2>
      <h2 class="guide-title">Guides</h2>
      {guides.map((guide) => (
        <div key={guide._id} class="Guide">
          <Link to={`/guides/${guide._id}`} class="guide-link">
            <h3 class="guide-header">{guide.title}</h3>
          </Link>
          <div class="Guide-buttons">
            <Link to={`/edit/${guide._id}`} class="edit-link">
              <button class="edit-button">Edit</button>
            </Link>
            <button class="delete-button" onClick={() => handleDeleteGuide(guide._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <p class="login-prompt">
        Please <Link to="/login" class="login-link">Login</Link> or <Link to="signup" >Signup</Link> to view your
          account
        </p>
      </div>
    )}
  </main>  
  );
}

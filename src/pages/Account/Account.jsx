// Create a page that allows a user to view their guides and personal data (name, email, etc.)

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
    
    async function deleteGuide(id) {
        await GuideApi.deleteGuide(id);
        const guideResponse = await GuideApi.getGuidesForUser(user._id);
        setGuides(guideResponse);
    }

    return (
    <main className="Account">
        {user ? (
        <div>
        <h1>{userData.name}</h1>
        <h2>{userData.email}</h2>
        <h2>Guides</h2>
        {guides.map((guide) => (
        <ul>
            <li key={guide._id}>
            <Link to={`/guides/${guide._id}`}><h3>{guide.title}</h3></Link>
            <Link to={`/edit/${guide._id}`}><button>Edit</button></Link>
            <button onClick={() => deleteGuide(guide._id)}>Delete</button>
            </li>
        </ul>
        ))}
        </div>
    ) : (
        <div>
        <p>Please <Link to='/login'>Login</Link> or <Link to="signup">Signup</Link> to view your account</p>
        </div>
    )}
</main>
    );
}
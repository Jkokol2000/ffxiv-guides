import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as ClassApi from '../../utilities/class-api'
import * as GuideApi from '../../utilities/guide-api'

function ClassPage(user) {
  const [classId, setClassId] = useState(null);
  const [guides, setGuides] = useState([]);
  const { id } = useParams(); // use useParams to get dynamic parameter from URL
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ClassApi.getClass(id);
        setClassId(response);
        const guideResponse = await GuideApi.getGuidesForClass(id);
        setGuides(guideResponse)
      } catch (err) {
        console.error(err);
      }
    }    
  
    fetchData();
  }, [id]);
  
  if (!classId) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{classId.name}</h1>
      <p>{classId.description}</p>
      { guides.length > 0 ? (
        <div>
          <h2>Guides</h2>
          
          {guides.map((guide) => (
            <div key={guide._id}>
              <Link to={`/guides/${guide._id}`}>
                <h3>{guide.title}</h3>
              </Link>
        </div>
          ))}
          </div>
      ) : (
        <div>No guides available. Be the first!</div>
      )}

      {user ? (
       <Link to={`/create/${id}`}>Create Guide</Link>
      ) : (
        <div>
          <p>Please <Link to='/login'>Login</Link> or <Link to="signup">Signup</Link> to create guides</p>
        </div>
      )}
    </div>
  );
}

export default ClassPage;

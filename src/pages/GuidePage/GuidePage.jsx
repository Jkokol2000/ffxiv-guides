import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as GuideApi from '../../utilities/guide-api'

function GuidePage() {
  const [guide, setGuide] = useState(null);
  const { id } = useParams(); // use useParams to get dynamic parameter from URL

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GuideApi.getGuide(id);
        setGuide(response);
      } catch (err) {
        console.error(err);
      }
    }
  
    fetchData();
  }, [id]);

  if (!guide) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{guide[0].title}</h1>
      <p>{guide[0].content}</p>
    </div>
  );
}

export default GuidePage;

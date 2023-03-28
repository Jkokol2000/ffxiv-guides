import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as GuideApi from '../../utilities/guide-api';

export default function GuidePage() {
  const [guide, setGuide] = useState(null); // initialize as null
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        console.log(id)
        const guideResponse = await GuideApi.getGuide(id);
        setGuide(guideResponse);
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
      <h1>{guide.title}</h1>
      <p>{guide.content}</p>
    </div>
  );
}

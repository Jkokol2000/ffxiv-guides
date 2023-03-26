import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as ClassApi from '../../utilities/class-api'

function ClassPage() {
  const [classId, setClassId] = useState(null);
  const { id } = useParams(); // use useParams to get dynamic parameter from URL
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ClassApi.getClass(id);
        setClassId(response);
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
    </div>
  );
}

export default ClassPage;

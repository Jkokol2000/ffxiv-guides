import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddCommentForm from '../../components/AddCommentForm/AddCommentForm';
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
      <div>
        <h1>{guide.title}</h1>
        <p>{guide.content}</p>
      </div>
      <AddCommentForm guideId={guide._id} />
      <h2>Comments</h2>
      {guide.comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.content}</p>
          <p>by {comment.user.username}</p>
        </div>
      ))}
    </div>
  );
}

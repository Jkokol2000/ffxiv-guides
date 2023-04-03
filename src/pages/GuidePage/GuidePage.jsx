import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddCommentForm from '../../components/AddCommentForm/AddCommentForm';
import * as GuideApi from '../../utilities/guide-api';
import './GuidePage.css';

export default function GuidePage({user}) {
  const [guide, setGuide] = useState(null);
  const [comments, setComments] = useState([])
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const guideResponse = await GuideApi.getGuide(id);
        setGuide(guideResponse);
      } catch (err) {
        console.error(err);
      }
    }
  fetchData();
  }, [id, comments]);

  
  
  if (!guide) {
    return <div>Loading...</div>;
  }

  return (
    <div className='guide-page'>
      <div>
        <h1>{guide.title}</h1>
        <p>{guide.content}</p>
      </div>
  
        <h2>Comments</h2>
        {guide.comments.map((comment) => (
          <div className="comment"key={comment._id}>
            <div className='comment-header'><h3>{comment.author} - {new Date(comment.createdAt).toLocaleDateString()}</h3></div>
            <p>{comment.content}</p>
          </div>
        ))}
        <AddCommentForm guideId={id} guide={guide} setGuide={setGuide} setComments={setComments} user={user} />
      </div>
  
      );
    }

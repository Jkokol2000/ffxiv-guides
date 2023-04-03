import { useState } from 'react';
import * as GuideApi from '../../utilities/guide-api';

export default function AddCommentForm({ guideId, setComments, user }) {
  const [commentContent, setCommentContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const comment = { 
        content: commentContent
      };
     const newComment = await GuideApi.createComment(comment, guideId);
     setComments(newComment)
    setCommentContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="content">Add a comment:</label>
        <input
          type="text"
          id="content"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

import { useState } from 'react';
import * as GuideApi from '../../utilities/guide-api';

export default function AddComment({ guideId }) {
  const [content, setContent] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = await GuideApi.createComment(guideId, { content });
    setContent('');
  };
  return (
    <div>
      <h2>Add Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

import { useState } from 'react';
import * as GuideApi from '../../utilities/guide-api';

export default function AddCommentForm({ guideId, guide, setGuide }) {
  const [content, setContent] = useState('');


    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const comment = { content };
        const newComment = await GuideApi.createComment(comment, guideId);
        // Update the guide's comments array by creating a new array with the new comment added
        const updatedComments = [...guide.comments, newComment];
        // Create a new guide object with the updated comments array
        const updatedGuide = { ...guide, comments: updatedComments };
        // Update the state with the new guide object
        setGuide(updatedGuide);
        // Clear the input field
        setContent('');
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

import { useState } from 'react';
import * as GuideApi from '../../utilities/guide-api';

export default function AddCommentForm({ guideId, guide, setGuide, setComments, user }) {
  const [commentContent, setCommentContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const comment = { 
        content: commentContent,
        user: user._id,
        author: user.name
      };
      
     const newComment = await GuideApi.createComment(comment, guideId);
     setComments(newComment)
      // Update the guide's comments array by creating a new array with the new comment added
  //    const updatedComments = [...guide.comments, newComment];
      // Create a new guide object with the updated comments array
   //   const updatedGuide = { ...guide, comments: updatedComments };
   //   setGuide({ ...updatedGuide, content: updatedGuide.content, author: updatedGuide.author });

      // Clear the input fields
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

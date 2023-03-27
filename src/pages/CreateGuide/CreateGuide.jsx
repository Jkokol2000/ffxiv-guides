import React, { useState } from 'react';
import * as GuideApi from '../../utilities/guide-api';

export default function CreateGuide({ classId, user }) {
  const [guideData, setGuideData] = useState({
    title: '',
    content: '',
    rating: 0,

  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const guide = { ...guideData, user: user._id };
    try {
      const newGuide = await GuideApi.createGuide(guide, classId);
      console.log(newGuide);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleChange = (event) => {
    setGuideData({ ...guideData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Create Guide</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={guideData.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Content:
          <textarea name="content" value={guideData.content} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Guide</button>
      </form>
    </div>
  );
}

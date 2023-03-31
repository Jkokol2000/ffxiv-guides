import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import * as GuideApi from '../../utilities/guide-api';
import './CreateGuide.css';

export default function CreateGuide({ user }) {
  const navigate = useNavigate();
  const [guide, setGuide] = useState(null);
  const { classid, guideid } = useParams();

  useEffect(() => {
    async function fetchGuide() {
      try {
        if (guideid) {
          const guideResponse = await GuideApi.getGuide(guideid);
          setGuide(guideResponse);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchGuide();
  }, [guideid]);

  const isEditing = !!guideid;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const guideData = {
      title: event.target.title.value,
      content: event.target.content.value,
      class: classid,
      rating: [],
      user: user._id,
      author: user.name
    };
    console.log(guideData)
    try {
      if (isEditing) {
        await GuideApi.updateGuide(guideid, guideData);
        navigate(`/guides/${guideid}`);
      } else {
        const newGuide = await GuideApi.createGuide(guideData, classid);
        navigate(`/guides/${newGuide._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isEditing && !classid) {
    // Return an error message if classid is not provided in the URL
    return <div>Invalid URL: classid not provided.</div>;
  }

  return (
    <div className="create-guide-container">
      <h1 className="create-guide-title">{isEditing ? 'Edit Guide' : 'Create Guide'}</h1>
      <form onSubmit={handleSubmit}>
        <label className="create-guide-label">
          Title:
          <input type="text" name="title" defaultValue={guide?.title} className="create-guide-input" />
        </label>
        <br />
        <label className="create-guide-label">
          Content:
          <textarea name="content" defaultValue={guide?.content} className="create-guide-textarea" />
          <ReactMarkdown className="create-guide-markdown">{guide?.content}</ReactMarkdown>
        </label>
        <br />
        <button type="submit" className="create-guide-button">{isEditing ? 'Save Guide' : 'Create Guide'}</button>
      </form>
    </div>
  );
}

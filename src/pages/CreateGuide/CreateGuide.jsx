import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as GuideApi from '../../utilities/guide-api';

export default function CreateGuide({ user }) {
  const navigate = useNavigate();
  const [guide, setGuide] = useState(null);
  const { classid, guideid } = useParams();
  console.log(classid)

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
      rating: [],
      user: user._id,
    };
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
    <div>
      <h1>{isEditing ? 'Edit Guide' : 'Create Guide'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" defaultValue={guide?.title} />
        </label>
        <br />
        <label>
          Content:
          <textarea name="content" defaultValue={guide?.content} />
        </label>
        <br />
        <button type="submit">{isEditing ? 'Save Guide' : 'Create Guide'}</button>
      </form>
    </div>
  );
}

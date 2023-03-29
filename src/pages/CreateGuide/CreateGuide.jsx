import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as GuideApi from '../../utilities/guide-api';

export default function CreateGuide({ user }) {
  const navigate = useNavigate();
  const [guide, setGuide] = useState({});
  const { id: guideId } = useParams();

  useEffect(() => {
    async function fetchGuide() {
      try {
        if (guideId) {
          const guideResponse = await GuideApi.getGuide(guideId);
          setGuide(guideResponse);
          setGuideData({
            title: guideResponse.title || '',
            content: guideResponse.content || '',
            rating: guideResponse.rating || 0,
          });
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchGuide();
  }, [guideId]);
  
  const [guideData, setGuideData] = useState({
    title: '',
    content: '',
    rating: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const guide = { ...guideData, user: user._id };
    try {
      if (guideId) {
        guide._id = guideId;
        await GuideApi.updateGuide(guideId, guide);
        navigate(`/guides/${guideId}`);
      } else {
        const newGuide = await GuideApi.createGuide(guide);
        navigate(`/guides/${newGuide._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleChange = (event) => {
    setGuideData({ ...guideData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>{guide._id ? 'Edit Guide' : 'Create Guide'}</h1>
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
        <button type="submit">{guide._id ? 'Save Guide' : 'Create Guide'}</button>
      </form>
    </div>
  );
}

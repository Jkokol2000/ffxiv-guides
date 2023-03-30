import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddCommentForm from '../../components/AddCommentForm/AddCommentForm';
import * as GuideApi from '../../utilities/guide-api';

export default function GuidePage() {
  const [guide, setGuide] = useState(null);
  const [selectedStar, setSelectedStar] = useState(0);
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

  const handleStarClick = (star) => {
    setSelectedStar(star);
  };

  const handleSubmitRanking = async (event) => {
    event.preventDefault();
    try {
      const ranking = { ranking: selectedStar };
      const updatedGuide = await GuideApi.updateGuide(id, ranking);
      setGuide(updatedGuide);
    } catch (err) {
      console.error(err);
    }
  };

  if (!guide) {
    return <div>Loading...</div>;
  }

  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      <div>
        <h1>{guide.title}</h1>
        <p>{guide.content}</p>
      </div>
      <div>
        <h2>Ranking</h2>
        <form onSubmit={handleSubmitRanking}>
          {stars.map((star) => (
            <label key={star}>
              <input type="radio" name="ranking" value={star} onClick={() => handleStarClick(star)} />
              {star} Star
            </label>
          ))}
          <button type="submit">Submit</button>
        </form>

        <h2>Comments</h2>
        {guide.comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.content}</p>
          </div>
        ))}
        <AddCommentForm guideId={id} guide={guide} setGuide={setGuide} />
      </div>
      </div>
      );
}

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { submitReviewToServer } from '../../utilities/reviews-api';
import './ReviewForm.css';

export default function ReviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState({
    text: '',
    storyRating: 1,
    gameplayRating: 1,
    graphicsRating: 1,
    audioRating: 1,
  });
  const [submittedReview, setSubmittedReview] = useState(null);

  const handleReviewSubmit = async () => {
    try {
      const newReview = {
        id: id,
        text: review.text,
        storyRating: review.storyRating,
        gameplayRating: review.gameplayRating,
        graphicsRating: review.graphicsRating,
        audioRating: review.audioRating,
      };

      console.log('Submitting review:', newReview);

      const response = await submitReviewToServer(newReview);

      console.log('Received response:', response);

      setSubmittedReview(response);
      navigate(`/games/${id}`);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  return (
    <div>
      <h2>Write a Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <div>
          <label>Review:</label>
          <textarea
            id="text"
            name="text"
            value={review.text}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Story:</label>
          <input
            type="number"
            id="storyRating"
            name="storyRating"
            value={review.storyRating}
            min="1"
            max="10"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Gameplay:</label>
          <input
            type="number"
            id="gameplayRating"
            name="gameplayRating"
            value={review.gameplayRating}
            min="1"
            max="10"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Graphics:</label>
          <input
            type="number"
            id="graphicsRating"
            name="graphicsRating"
            value={review.graphicsRating}
            min="1"
            max="10"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Audio:</label>
          <input
            type="number"
            id="audioRating"
            name="audioRating"
            value={review.audioRating}
            min="1"
            max="10"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit Review</button>
        </div>
      </form>

      {submittedReview && (
        <div>
          <h3>Your Review:</h3>
          <p>Text: {submittedReview.text}</p>
          <p>Story: {submittedReview.storyRating}</p>
          <p>Gameplay: {submittedReview.gameplayRating}</p>
          <p>Graphics: {submittedReview.graphicsRating}</p>
          <p>Audio: {submittedReview.audioRating}</p>
        </div>
      )}
    </div>
  );
}
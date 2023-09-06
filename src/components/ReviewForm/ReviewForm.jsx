import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { submitReviewToServer } from '../../utilities/reviews-api';


export default function ReviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [review, setReview] = useState({
    text: '',
    score: 1,
  });
  const [submittedReview, setSubmittedReview] = useState(null);

  const handleReviewSubmit = async () => {
    try {
      const newReview = {
        id: id,
        text: review.text,
        score: review.score,
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
          <label htmlFor="text">Review:</label>
          <textarea
            id="text"
            name="text"
            value={review.text}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="score">Score:</label>
          <input
            type="number"
            id="score"
            name="score"
            value={review.score}
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
          <p>Score: {submittedReview.score}</p>
          
        </div>
      )}
    </div>
  );
}
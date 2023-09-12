import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById } from '../../utilities/games-api';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import './GameDetailsPage.css';

export default function GameDetailsPage({ user }) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);

  
  function calculateOverallScore(reviews) {
    if (reviews.length === 0) {
      return 0; 
    }

    const totalScore = reviews.reduce(
      (total, review) =>
        total +
        (review.storyRating +
          review.gameplayRating +
          review.graphicsRating +
          review.audioRating) /
          4,
      0
    );

    return (totalScore / reviews.length).toFixed(1);
  }

  useEffect(() => {
    async function fetchGameDetails() {
      try {
        const response = await getGameById(id);
        setGame(response);
        setReviews(response.reviews || []);
        const userHasReviewed = response.reviews.some(
          (review) => review.user === user._id
        );
        setHasUserReviewed(userHasReviewed);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    }

    fetchGameDetails();
  }, [user._id, id]);

  return (
    <div className="game-details-container">
      <h1 className="game-title">Game Details</h1>
      {game ? (
        <div className="game-info">
          <h2 className="game-name">{game.name}</h2>
          <h2 className="game-studio">{game.gameStudio}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {!hasUserReviewed && <ReviewForm gameId={id} />}

      {reviews.length > 0 ? (
        <div className="reviews-section">
          {/* <h2 className="reviews-title">Reviews</h2> */}
          <ul className="reviews-list">
            {reviews.map((review, index) => (
              <li key={index} className={`review-item ${index % 2 === 0 ? 'even-item' : 'odd-item'}`}>
                <p className="review-text">{review.text}</p>
                <p className="review-score">Review Score: {review.score}</p>
                <p className="review-story-rating">Story: {review.storyRating}</p>
                <p className="review-gameplay-rating">Gameplay: {review.gameplayRating}</p>
                <p className="review-graphics-rating">Graphics: {review.graphicsRating}</p>
                <p className="review-audio-rating">Audio: {review.audioRating}</p>
              </li>
            ))}
          </ul>
          <div className="overall-score-container">
            <p className="overall-score">
             {calculateOverallScore(reviews)}
            </p>
          </div>
        </div>
      ) : (
        <p className="no-reviews">No reviews available</p>
      )}
    </div>
  );
}
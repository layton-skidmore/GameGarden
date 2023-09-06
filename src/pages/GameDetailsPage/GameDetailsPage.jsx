import React, { useState, useEffect } from 'react';
import { useParams, } from 'react-router-dom';
import { getGameById } from '../../utilities/games-api';
import ReviewForm from '../../components/ReviewForm/ReviewForm';

export default function GameDetailsPage( user ) {
  const { id } = useParams(); // Get the game ID from the URL parameter
  const [game, setGame] = useState(null); // State to store the game details
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [hasUserReviewed, setHasUserReviewed] = useState(false); // Track if the user has reviewed the game
  

  useEffect(() => {
    async function fetchGameDetails() {
      try {
        const response = await getGameById(id);
        console.log("API Response:", response);
        setGame(response);
        setReviews(response.reviews || []); // Assuming the reviews are stored in the 'reviews' property
        // Check if the user has already reviewed the game
        const userHasReviewed = response.reviews.some(review => review.user === user._id);
        setHasUserReviewed(userHasReviewed);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    }

    fetchGameDetails();
  }, [user._id, id]);

  return (
    <div>
      <h1>Game Details</h1>
      {game ? (
        <div>
          <h2>{game.name}</h2>
          <h2>{game.gameStudio}</h2>
          {/* Display other game details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Conditional rendering of the ReviewForm component */}
      {!hasUserReviewed && <ReviewForm gameId={id} />}

      {/* Display reviews */}
      {reviews.length > 0 ? (
        <div>
          <h2>Reviews</h2>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <p>Review Text: {review.text}</p>
                <p>Review Score: {review.score}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
}



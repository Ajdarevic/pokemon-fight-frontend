// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link component for navigation

const HighScores = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    // Simulate fetching high scores from an API or database
    const fetchHighScores = async () => {
      try {
        // Replace this with actual API endpoint
        const response = await fetch("https://example.com/high-scores");
        const data = await response.json();
        // Assuming the API returns an array of high scores
        setHighScores(data);
      } catch (error) {
        console.error("Error fetching high scores:", error);
      }
    };

    fetchHighScores();
  }, []);

  return (
    <div>
      <h1>High Scores</h1>
      <ol>
        {highScores.map((score, index) => (
          <li key={index}>
            {score.playerName} - {score.score}
          </li>
        ))}
      </ol>
      {/* Button to navigate back to PokemonList */}
      <Link to="/" className="back-button">
        Back to Pokemon List
      </Link>
    </div>
  );
};

export default HighScores;

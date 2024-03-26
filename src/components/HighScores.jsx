// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link component for navigation
import "./highScores.css";
import "@fortawesome/fontawesome-free/css/all.css";

const HighScores = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    // Simulate fetching high scores from an API or database
    const fetchHighScores = async () => {
      try {
        // Replace this with actual API endpoint
        const response = await fetch(
          "https://pokemon-api-vmgy.onrender.com/fight-result"
        );
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
    <div className="highScores-container" style={{ height: "100vh" }}>
      <h1>High Scores</h1>
      <table className="highScores-container-table">
        <tr>
          <th>score</th>
          <th>winner</th>
          <th>loser</th>
        </tr>
        {highScores && (
          <tr>
            highscores.map( (item) )<td></td>
          </tr>
        )}
      </table>

      {/* {highScores.map((score, index) => (
          <li key={index}>
            {score.playerName} - {score.score}
          </li>
        ))} */}

      {/* Button to navigate back to PokemonList */}
      <Link to="/" className="back-button">
        home
      </Link>
      <div className="anime_container">
        <div className="ring">
          <i className="fas fa-star"></i>
        </div>
        <div className="ring">
          <i className="fas fa-star"></i>
        </div>
        <div className="ring">
          <i className="fas fa-star"></i>
        </div>
      </div>
    </div>
  );
};

export default HighScores;

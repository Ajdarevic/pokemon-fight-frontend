// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link component for navigation
import "./highScores.css";

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
    <div className="highScores-container">
      <h1>High Scores</h1>
      <table className="highScores-container-table">
        <tr>
          <th>playerName</th>
          <th>score</th>
          <th>winner</th>
          <th>loser</th>
        </tr>

        <tr>
          <td>playerName1</td>
          <td>100</td>
          <td>poke1</td>
          <td>poke2</td>
        </tr>
      </table>

      {/* {highScores.map((score, index) => (
          <li key={index}>
            {score.playerName} - {score.score}
          </li>
        ))} */}

      {/* Button to navigate back to PokemonList */}
      <Link to="/" className="back-button">
        Back to Pokemon List
      </Link>
    </div>
  );
};

export default HighScores;

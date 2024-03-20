// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HighScores from "./HighScores"; // Import HighScores component
import "./fightPage.css";

const FightPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve the Pokémon ID from URL parameter
  const [pokemonData, setPokemonData] = useState(null);
  const [opponentData, setOpponentData] = useState(null);
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error(
            `Error fetching details for Pokémon ${id}: ${response.statusText}`
          );
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRandomPokemon = async () => {
      try {
        const randomId = Math.floor(Math.random() * 898) + 1; // Generate random ID between 1 and 898
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching details for the random Pokémon: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("THE OPPONENT DATA: ", data);
        setOpponentData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchPokemonData(); // Fetch player's Pokémon data
      fetchRandomPokemon(); // Fetch opponent's Pokémon data
    }
  }, [id]);

  const startFight = () => {
    // Logic to start the fight
    const killTtimePokemon =
      opponentData.stats[0].base_stat /
      ((pokemonData.stats[5].base_stat * pokemonData.stats[1].base_stat) /
        (opponentData.stats[2].base_stat / 230));

    const killTtimeOpponent =
      pokemonData.stats[0].base_stat /
      ((opponentData.stats[5].base_stat * opponentData.stats[1].base_stat) /
        (pokemonData.stats[2].base_stat / 230));

    if (killTtimePokemon - killTtimeOpponent < 0) {
      setWinner(pokemonData);
      setLoser(opponentData);
    } else {
      setWinner(opponentData);
      setLoser(pokemonData);
    }
    console.log("WINNER IS Chosen");
  };

  return (
    <div className="fight-page-container">
      <h1 className="fight-page-title">Fight Page</h1>
      {pokemonData && opponentData ? (
        <>
          <div className="fight-content">
            <div className="fight-page-content">
              <h2 className="pokemon-name">{pokemonData.name}</h2>
              <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
                className="pokemon-image"
                width="150"
                height="100"
              />
              {/* Display other details for player's Pokémon */}
            </div>
            <div className="fight-page-content">
              <h2 className="opponent-name">{opponentData.name}</h2>
              <img
                src={opponentData.sprites.front_default}
                alt={opponentData.name}
                className="opponent-image"
                width="150"
                height="100"
              />
              {/* Display other details for opponent's Pokémon */}
            </div>
          </div>
          <div className="fight-page-button-container">
            <button onClick={() => navigate("/")} className="back-button">
              Back to Pokemon List
            </button>
            <button onClick={startFight} className="fight-button ">
              Start Fight
            </button>

            {/* Link to HighScores component */}
            <Link to="/HighScores" className="highscores-button">
              High Scores
            </Link>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {winner && (
        <>
          <div className="fight-content">
            <div className="fight-page-content">
              <h2>The Winner:</h2>
              <h2 className="opponent-name">{winner.name}</h2>
              <img
                src={winner.sprites.front_default}
                alt={winner.name}
                className="opponent-image"
                width="150"
                height="200"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FightPage;

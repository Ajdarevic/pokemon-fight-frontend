import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./fightPage.css";

const FightPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [opponentData, setOpponentData] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [showFightText, setShowFightText] = useState(true); // State to control the visibility of "Fight" text

  const backgroundImage = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "arena2.jpg",
    "arena3.jpg",
  ];

  const randomIndex = Math.floor(Math.random() * backgroundImage.length);

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
        const randomId = Math.floor(Math.random() * 898) + 1;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching details for the random Pokémon: ${response.statusText}`
          );
        }
        const data = await response.json();
        setOpponentData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchPokemonData();
      fetchRandomPokemon();
    }
  }, [id]);

  const startFight = () => {
    const killTtimePokemon =
      opponentData.stats[0].base_stat /
      ((pokemonData.stats[5].base_stat * pokemonData.stats[1].base_stat) /
        (opponentData.stats[2].base_stat / 230));

    const killTtimeOpponent =
      pokemonData.stats[0].base_stat /
      ((opponentData.stats[5].base_stat * opponentData.stats[1].base_stat) /
        (pokemonData.stats[2].base_stat / 230));

    if (killTtimePokemon - killTtimeOpponent < 0) {
      setLoser(opponentData);
      setTimeout(() => {
        setWinner(pokemonData);
        setShowFightText(false); // Hide "Fight" text when winner is displayed
      }, 1000); // Delay winner display after loser animation
    } else {
      setLoser(pokemonData);
      setTimeout(() => {
        setWinner(opponentData);
        setShowFightText(false); // Hide "Fight" text when winner is displayed
      }, 1000); // Delay winner display after loser animation
    }
  };

  return (
    <div
      className="fight-page-container"
      style={{
        backgroundImage: `url("/${backgroundImage[randomIndex]}")`,
        backgroundSize: "cover",
      }}
    >
      {showFightText && <h1 className="fight-page-title">Fight</h1>}
      {pokemonData && opponentData && !winner && (
        <div className="fight-content">
          <div className={`pokemon-card ${loser ? "loser-animation" : ""}`}>
            <h2 className="opponent-name">{opponentData.name}</h2>
            <img
              src={opponentData.sprites.front_default}
              alt={opponentData.name}
              className="pokemon-image"
              width="150"
              height="100"
            />
          </div>
          <div className={`pokemon-card ${winner ? "winner-animation" : ""}`}>
            <h2 className="opponent-name">{pokemonData.name}</h2>
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
              className="pokemon-image"
              width="150"
              height="100"
            />
          </div>
        </div>
      )}
      {winner && (
        <div className={`pokemon-card ${winner ? "winner-animation" : ""}`}>
          <h2 className="winner-page-title opponent-name">The Winner is</h2>
          <h2 className="opponent-name">{winner.name}</h2>
          <img
            src={winner.sprites.front_default}
            alt={winner.name}
            className="pokemon-image"
            width="150"
            height="200"
          />
        </div>
      )}
      <div className="fight-page-button-container">
        <button onClick={() => navigate("/")} className="back-button">
          home
        </button>
        {!winner && (
          <button onClick={startFight} className="fight-button ">
            Start Fight
          </button>
        )}
        <Link to="/HighScores" className="highscore-button ">
          High Scores
        </Link>
      </div>
    </div>
  );
};

export default FightPage;

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import "./PokemonList.css"; // Import CSS file for styling

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-list-container">
      <h1 className="pokemon-list-title">Pokemon List</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleSearchInputChange}
        className="search-bar"
      />
      <div className="pokemon-grid">
        {filteredPokemonList.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-card">
            <Link to={`/pokemon/${pokemon.name}`} className="pokemon-link">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split("/")[6]
                }.png`}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <p className="pokemon-name">{pokemon.name}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="button-container">
        <Link to="/fight" className="button">
          Start Fight
        </Link>
        <Link to="/highscores" className="button">
          High Scores
        </Link>
      </div>
    </div>
  );
};

export default PokemonList;

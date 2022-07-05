import React, { useState } from "react";
import { Results } from "./Results";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gameResults, setGameResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let slug = searchTerm.split(" ").join("-").toLowerCase();

    setGameResults([]);
    fetch(
      `https://api.rawg.io/api/games?key=0929bf6edddc4ca0b6b87155780d1977&search=${slug}`
    )
      .then((resp) => resp.json())
      .then(({ results }) => {
        results === undefined
          ? alert("no games found")
          : setGameResults(results);
      });
    setSearchTerm("");
  };

  return (
    <div className="game-search">
    <form onSubmit={onSubmit}>
      <div className="dropdown">
      <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <input type="text" className="btn-primary" value={searchTerm} onChange={handleChange} />
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">    
        <Results gameResults={gameResults} />
        </ul>
        <input type="submit" />
      </div>
      </form>
    </div>
  );
};

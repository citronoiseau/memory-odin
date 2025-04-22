import { useState } from "react";
import usePokemon from "./components/PokemonAPI";
import PokemonCard from "./components/PokemonCard";
import Dialog from "./components/Dialog";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clicked, setClicked] = useState(new Set());
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const pokemons = usePokemon(6, refreshKey);

  let shuffled = pokemons
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  function handleClick(name) {
    if (!visibleDialog) {
      if (clicked.has(name)) {
        if (score > bestScore) {
          setBestScore(score);
        }
        setIsWin(false);
        setVisibleDialog(true);
      } else {
        setScore((prevScore) => prevScore + 1);
        const newClicked = new Set(clicked);
        newClicked.add(name);
        setClicked(newClicked);

        if (newClicked.size === pokemons.length) {
          setIsWin(true);
          setVisibleDialog(true);
        }
      }
    }
  }

  function restartGame() {
    if (score > bestScore) {
      setBestScore(score);
    }
    setScore(0);
    setClicked(new Set());
    setRefreshKey(refreshKey + 1);
    setVisibleDialog(false);
    setIsWin(false);
  }

  return (
    <div className="main-container">
      <div className="info-container">
        <h1>🔴Pokemon Memory Game⚫</h1>
        <div className="description">
          Get points by clicking on a pokemon but don't click on any more than
          once!
        </div>
        <div className="scoreboard">
          <div>Score: {score}</div>
          <div> Best Score: {bestScore} </div>
        </div>
      </div>
      <div className="pokemon-container">
        {pokemons.length === 0 ? (
          <div className="loading">Loading...</div>
        ) : (
          shuffled.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              onClick={() => handleClick(pokemon.name)}
            />
          ))
        )}
      </div>
      <Dialog
        score={score}
        isWin={isWin}
        restartGame={restartGame}
        visible={visibleDialog}
      />
    </div>
  );
}

export default App;

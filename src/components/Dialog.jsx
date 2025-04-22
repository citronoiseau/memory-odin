import { useEffect, useRef } from "react";
import pokemon from "/pokemon.png";
import sad from "/sad.png";

export default function Dialog({ score, isWin, restartGame, visible }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (visible && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [visible]);

  return (
    <dialog ref={dialogRef}>
      <div className="dialog-container">
        <h1>{isWin ? "You won!" : "You lost!"}</h1>
        <div className="image-container">
          {isWin ? (
            <img src={pokemon} alt="Pokemon" />
          ) : (
            <img src={sad} alt="Sad face" />
          )}
        </div>
        <div className="dialog-score">Score: {score}</div>
        <button
          onClick={() => {
            dialogRef.current.close();
            restartGame();
          }}
        >
          Play Again?
        </button>
      </div>
    </dialog>
  );
}

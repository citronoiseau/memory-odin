import { useEffect, useRef } from "react";
import pokemon from "/pokemon.png";

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
        <div class="image-container">
          {" "}
          <img src={pokemon} />
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

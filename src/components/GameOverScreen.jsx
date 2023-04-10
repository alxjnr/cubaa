import { useContext } from "react";
import { gameOverContext } from "../contexts/gameOver";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

export const GameOverScreen = () => {
  const { gameOver } = useContext(gameOverContext);

  return (
    <section>
      <section
        className="navbar"
        style={{ width: "97vw", borderRadius: "5px" }}
      >
        <button>
          <Link to="/">home</Link>
        </button>
        <button>
          <Link to="/rules">rules</Link>
        </button>
        <button>
          <Link to="/about">about</Link>
        </button>
      </section>
      <section>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={100}
          gravity={0.05}
        />
      </section>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>{gameOver.winner} wins!</h2>
      </section>
    </section>
  );
};

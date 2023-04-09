import { useContext } from "react";
import { gameOverContext } from "../contexts/gameOver";

export const GameOverScreen = () => {
  const { gameOver } = useContext(gameOverContext);

  return <h2>{gameOver.winner} wins!</h2>;
};

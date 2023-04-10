import { playerOneHandContext } from "../contexts/playerOneHand";
import { playerTwoHandContext } from "../contexts/playerTwoHand";
import { thisUserContext } from "../contexts/thisUser";
import { useContext } from "react";
import { PlayerOneBoardHand } from "./PlayerOneBoardHand";
import { PlayerTwoBoardHand } from "./PlayerTwoBoardHand";
import { PlayerOneBoardTriangle } from "./PlayerOneBoardTriangle";
import { PlayerTwoBoardTriangle } from "./PlayerTwoBoardTriangle";
import { selectedCardContext } from "../contexts/selectedCard";
import { gameOverContext } from "../contexts/gameOver";
import { MainDeck } from "./MainDeck";
import { GameOverScreen } from "./GameOverScreen";
import { currentTurnContext } from "../contexts/currentTurn";
import { currentUsersContext } from "../contexts/currentUsers";

export const GameBoard = () => {
  const { playerOneHand } = useContext(playerOneHandContext);
  const { playerTwoHand } = useContext(playerTwoHandContext);
  const { thisUser } = useContext(thisUserContext);
  const { gameOver } = useContext(gameOverContext);
  const { currentTurn } = useContext(currentTurnContext);
  const { currentUsers } = useContext(currentUsersContext);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "50vw",
        margin: "auto",
        maxWidth: "400px",
      }}
    >
      <section>
        {gameOver.isOver ? (
          <section></section>
        ) : thisUser === "playerOne" ? (
          <section style={{ marginTop: "5px" }}>
            <PlayerTwoBoardHand />
            <PlayerTwoBoardTriangle />
            <PlayerOneBoardTriangle />
            <PlayerOneBoardHand />
          </section>
        ) : (
          <section style={{ marginTop: "5px" }}>
            <PlayerOneBoardHand />
            <PlayerOneBoardTriangle />
            <PlayerTwoBoardTriangle />
            <PlayerTwoBoardHand />
          </section>
        )}
      </section>
      <section>
        {gameOver.isOver ? (
          <GameOverScreen />
        ) : (
          <section
            style={{
              display: "flex",
              height: "100vh",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <MainDeck />
            <h5 style={{ color: currentTurn === thisUser ? "green" : "black" }}>
              {currentTurn === "playerOne"
                ? `current turn: ${currentUsers[0]}`
                : `current turn: ${currentUsers[1]}`}
            </h5>
          </section>
        )}
      </section>
    </section>
  );
};

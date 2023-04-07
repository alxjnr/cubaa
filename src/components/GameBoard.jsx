import { playerOneHandContext } from "../contexts/playerOneHand";
import { playerTwoHandContext } from "../contexts/playerTwoHand";
import { thisUserContext } from "../contexts/thisUser";
import { useContext } from "react";
import { PlayerOneBoardHand } from "./PlayerOneBoardHand";
import { PlayerTwoBoardHand } from "./PlayerTwoBoardHand";
import { PlayerOneBoardTriangle } from "./PlayerOneBoardTriangle";
import { PlayerTwoBoardTriangle } from "./PlayerTwoBoardTriangle";
import { selectedCardContext } from "../contexts/selectedCard";

export const GameBoard = () => {
  const { playerOneHand } = useContext(playerOneHandContext);
  const { playerTwoHand } = useContext(playerTwoHandContext);
  const { thisUser } = useContext(thisUserContext);

  return (
    <section>
      {thisUser === "playerOne" ? (
        <section>
          <PlayerTwoBoardHand />
          <PlayerTwoBoardTriangle />
          <PlayerOneBoardTriangle />
          <PlayerOneBoardHand />
        </section>
      ) : (
        <section>
          <PlayerOneBoardHand />
          <PlayerOneBoardTriangle />
          <PlayerTwoBoardTriangle />
          <PlayerTwoBoardHand />
        </section>
      )}
    </section>
  );
};

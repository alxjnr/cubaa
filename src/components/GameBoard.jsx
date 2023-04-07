import { playerOneHandContext } from "../contexts/playerOneHand";
import { playerTwoHandContext } from "../contexts/playerTwoHand";
import { thisUserContext } from "../contexts/thisUser";
import { useContext } from "react";
import { PlayerOneBoardHand } from "./PlayerOneBoardHand";
import { PlayerTwoBoardHand } from "./PlayerTwoBoardHand";

export const GameBoard = () => {
  const { playerOneHand } = useContext(playerOneHandContext);
  const { playerTwoHand } = useContext(playerTwoHandContext);
  const { thisUser } = useContext(thisUserContext);

  return (
    <section>
      {thisUser === "playerOne" ? (
        <section>
          <PlayerTwoBoardHand />
          <PlayerOneBoardHand />
        </section>
      ) : (
        <section>
          <PlayerOneBoardHand />
          <PlayerTwoBoardHand />
        </section>
      )}
    </section>
  );
};

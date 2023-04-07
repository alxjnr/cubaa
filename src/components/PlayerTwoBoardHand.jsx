import { thisUserContext } from "../contexts/thisUser";
import { useContext } from "react";
import { playerTwoHandContext } from "../contexts/playerTwoHand";

export const PlayerTwoBoardHand = () => {
  const { thisUser } = useContext(thisUserContext);
  const { playerTwoHand } = useContext(playerTwoHandContext);

  return (
    <section className="card-hand">
      {playerTwoHand.map((card) => {
        return (
          <img
            className="card-on-board"
            key={card.code}
            alt={card.code}
            src={
              thisUser === "playerTwo" ? card.image : "/images/back-of-card.png"
            }
            onClick={() => {}}
          />
        );
      })}
    </section>
  );
};

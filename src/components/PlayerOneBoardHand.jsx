import { useContext } from "react";
import { playerOneHandContext } from "../contexts/playerOneHand";
import { thisUserContext } from "../contexts/thisUser";

export const PlayerOneBoardHand = () => {
  const { playerOneHand } = useContext(playerOneHandContext);
  const { thisUser } = useContext(thisUserContext);

  return (
    <section className="card-hand">
      {playerOneHand.map((card) => {
        return (
          <img
            className="card-on-board"
            key={card.code}
            alt={card.code}
            src={
              thisUser === "playerOne" ? card.image : "/images/back-of-card.png"
            }
            onClick={() => {}}
          />
        );
      })}
    </section>
  );
};

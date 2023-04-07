import { thisUserContext } from "../contexts/thisUser";
import { useContext } from "react";
import { playerTwoHandContext } from "../contexts/playerTwoHand";
import { selectedCardContext } from "../contexts/selectedCard";

export const PlayerTwoBoardHand = () => {
  const { thisUser } = useContext(thisUserContext);
  const { playerTwoHand } = useContext(playerTwoHandContext);
  const { selectedCard, setSelectedCard } = useContext(selectedCardContext);

  return (
    <section className="card-hand">
      {playerTwoHand.map((card) => {
        return (
          <img
            className={
              selectedCard === card ? "card-on-board-selected" : "card-on-board"
            }
            key={card.code}
            alt={card.code}
            src={
              thisUser === "playerTwo" ? card.image : "/images/back-of-card.png"
            }
            onClick={() => {
              setSelectedCard(card);
            }}
          />
        );
      })}
    </section>
  );
};

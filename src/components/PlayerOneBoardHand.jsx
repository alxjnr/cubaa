import { useContext } from "react";
import { playerOneHandContext } from "../contexts/playerOneHand";
import { thisUserContext } from "../contexts/thisUser";
import { selectedCardContext } from "../contexts/selectedCard";
import { cardInBattleContext } from "../contexts/cardInBattle";

export const PlayerOneBoardHand = () => {
  const { playerOneHand } = useContext(playerOneHandContext);
  const { thisUser } = useContext(thisUserContext);
  const { selectedCard, setSelectedCard } = useContext(selectedCardContext);
  const { cardInBattle } = useContext(cardInBattleContext);

  return (
    <section className="card-hand">
      {playerOneHand.map((card) => {
        return (
          <img
            className={
              selectedCard === card ? "card-on-board-selected" : "card-on-board"
            }
            key={card.code}
            alt={card.code}
            src={
              thisUser === "playerOne" || card.code === cardInBattle.code
                ? card.image
                : "/images/back-of-card.png"
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

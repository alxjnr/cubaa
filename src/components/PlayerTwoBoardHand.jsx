import { thisUserContext } from "../contexts/thisUser";
import { useContext } from "react";
import { playerTwoHandContext } from "../contexts/playerTwoHand";
import { selectedCardContext } from "../contexts/selectedCard";
import { cardInBattleContext } from "../contexts/cardInBattle";

export const PlayerTwoBoardHand = () => {
  const { thisUser } = useContext(thisUserContext);
  const { playerTwoHand } = useContext(playerTwoHandContext);
  const { selectedCard, setSelectedCard } = useContext(selectedCardContext);
  const { cardInBattle } = useContext(cardInBattleContext);

  return (
    <section className="card-hand">
      {playerTwoHand.map((card) => {
        return (
          <img
            className={
              card.code === cardInBattle.code
                ? "card-on-board-in-battle-p1"
                : selectedCard === card
                ? "card-on-board-selected"
                : "card-on-board"
            }
            key={card.code}
            alt={card.code}
            src={
              thisUser === "playerTwo" || card.code === cardInBattle.code
                ? card.image
                : "/images/back-of-card.png"
            }
            style={{
              transform:
                card.code === cardInBattle.code
                  ? thisUser === "playerOne"
                    ? "translateY(100px)"
                    : "translateY(-100px)"
                  : "",
            }}
            onClick={() => {
              setSelectedCard(card);
            }}
          />
        );
      })}
    </section>
  );
};

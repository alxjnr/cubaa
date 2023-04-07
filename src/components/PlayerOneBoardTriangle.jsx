import { useContext, useState } from "react";
import { playerOneTriangleContext } from "../contexts/playerOneTriangle";
import { thisUserContext } from "../contexts/thisUser";
import { selectedCardContext } from "../contexts/selectedCard";

export const PlayerOneBoardTriangle = () => {
  const { playerOneTriangle } = useContext(playerOneTriangleContext);
  const { thisUser } = useContext(thisUserContext);
  const { selectedCard } = useContext(selectedCardContext);
  const [revealed, setRevealed] = useState(
    new Array(playerOneTriangle.length).fill(false)
  );

  const handleBattle = (selectedCard, opposingCard) => {
    let selectedCardVal = selectedCard.code[0];
    let opposingCardVal = opposingCard.code[0];

    if (selectedCardVal === "J") {
      selectedCardVal = 11;
    } else if (selectedCardVal === "Q") {
      selectedCardVal = 12;
    } else if (selectedCardVal === "K") {
      selectedCardVal = 13;
    } else if (selectedCardVal === "A") {
      selectedCardVal = 14;
    }

    if (opposingCardVal === "J") {
      opposingCardVal = 11;
    } else if (opposingCardVal === "Q") {
      opposingCardVal = 12;
    } else if (opposingCardVal === "K") {
      opposingCardVal = 13;
    } else if (opposingCardVal === "A") {
      opposingCardVal = 14;
    }

    if (selectedCardVal > opposingCardVal) {
      console.log("card won");
    } else if (selectedCardVal === opposingCardVal) {
      console.log("same cards");
    } else {
      console.log("card lost");
    }
  };

  return (
    <section className="player-one-board">
      {thisUser === "playerOne" ? (
        <section>
          <section className="player-one-board-one">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[0].code}
                alt={playerOneTriangle[0].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[0].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
                onClick={() => {
                  console.log(playerOneTriangle[0]);
                }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[1].code}
                alt={playerOneTriangle[1].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[1].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[2].code}
                alt={playerOneTriangle[2].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[2].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[3].code}
                alt={playerOneTriangle[3].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[3].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
          <section className="player-one-board-two">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[4].code}
                alt={playerOneTriangle[4].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[4].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[5].code}
                alt={playerOneTriangle[5].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[5].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[6].code}
                alt={playerOneTriangle[6].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[6].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
          <section className="player-one-board-three">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[7].code}
                alt={playerOneTriangle[7].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[7].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[8].code}
                alt={playerOneTriangle[8].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[8].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
          <section className="player-one-board-four">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[9].code}
                alt={playerOneTriangle[9].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[9].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
        </section>
      ) : (
        <section>
          <section className="player-one-board-four">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[9].code}
                alt={playerOneTriangle[9].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[9].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
          <section className="player-one-board-three">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[7].code}
                alt={playerOneTriangle[7].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[7].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[8].code}
                alt={playerOneTriangle[8].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[8].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
          <section className="player-one-board-two">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[4].code}
                alt={playerOneTriangle[4].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[4].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[5].code}
                alt={playerOneTriangle[5].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[5].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[6].code}
                alt={playerOneTriangle[6].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[6].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
          <section className="player-one-board-one">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[0].code}
                alt={playerOneTriangle[0].code}
                src={
                  thisUser === "playerOne" || revealed[0]
                    ? playerOneTriangle[0].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
                onClick={() => {
                  if (selectedCard && thisUser === "playerTwo") {
                    setRevealed((prev) => {
                      const updatedRevealed = [...prev];
                      updatedRevealed[0] = true;
                      return updatedRevealed;
                    });
                    handleBattle(selectedCard, playerOneTriangle[0]);
                  }
                }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[1].code}
                alt={playerOneTriangle[1].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[1].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[2].code}
                alt={playerOneTriangle[2].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[2].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerOneTriangle[3].code}
                alt={playerOneTriangle[3].code}
                src={
                  thisUser === "playerOne"
                    ? playerOneTriangle[3].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

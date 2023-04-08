import { useContext, useEffect, useState } from "react";
import { playerTwoTriangleContext } from "../contexts/playerTwoTriangle";
import { thisUserContext } from "../contexts/thisUser";
import { selectedCardContext } from "../contexts/selectedCard";
import { socket } from "../socket";
import { currentTurnContext } from "../contexts/currentTurn";
import { cardInBattleContext } from "../contexts/cardInBattle";

export const PlayerTwoBoardTriangle = () => {
  const { playerTwoTriangle } = useContext(playerTwoTriangleContext);
  const { thisUser } = useContext(thisUserContext);
  const { selectedCard } = useContext(selectedCardContext);
  const { currentTurn } = useContext(currentTurnContext);
  const { cardInBattle } = useContext(cardInBattleContext);

  const [revealed, setRevealed] = useState(
    new Array(playerTwoTriangle.length).fill(false)
  );

  const handleBattle = (selectedCard, opposingCard, tileIndex) => {
    socket.emit("cardInBattle", selectedCard);
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

    setTimeout(() => {
      console.log(cardInBattle);
      if (selectedCardVal >= opposingCardVal) {
        console.log("card won");
        socket.emit("cardToPlayerOne", opposingCard);
        socket.emit("playerTwoLostTile", tileIndex);
        socket.emit("turnSwitch", currentTurn);
      } else {
        socket.emit("cardToPlayerTwo", selectedCard);
        socket.emit("playerOneLostCard", selectedCard);
        socket.emit("turnSwitch", currentTurn);
      }
    }, 2000);
  };

  return (
    <section className="player-one-board">
      {thisUser === "playerTwo" ? (
        <section>
          <section className="player-one-board-one">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[0].code}
                alt={playerTwoTriangle[0].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[0].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[1].code}
                alt={playerTwoTriangle[1].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[1].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[2].code}
                alt={playerTwoTriangle[2].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[2].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[3].code}
                alt={playerTwoTriangle[3].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[3].image
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
                key={playerTwoTriangle[4].code}
                alt={playerTwoTriangle[4].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[4].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[5].code}
                alt={playerTwoTriangle[5].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[5].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[6].code}
                alt={playerTwoTriangle[6].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[6].image
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
                key={playerTwoTriangle[7].code}
                alt={playerTwoTriangle[7].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[7].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[8].code}
                alt={playerTwoTriangle[8].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[8].image
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
                key={playerTwoTriangle[9].code}
                alt={playerTwoTriangle[9].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[9].image
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
              {playerTwoTriangle[9] === false ? (
                <section></section>
              ) : (
                <img
                  className="card-on-board"
                  key={playerTwoTriangle[9].code}
                  alt={playerTwoTriangle[9].code}
                  src={
                    revealed[9]
                      ? playerTwoTriangle[9].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[9] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerTwoTriangle[9], 9);
                    }
                  }}
                />
              )}
            </section>
          </section>
          <section className="player-one-board-three">
            <section className="player-one-square">
              {playerTwoTriangle[7] === false ? (
                <section></section>
              ) : (
                <img
                  className="card-on-board"
                  key={playerTwoTriangle[7].code}
                  alt={playerTwoTriangle[7].code}
                  src={
                    revealed[7]
                      ? playerTwoTriangle[7].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[7] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerTwoTriangle[7], 7);
                    }
                  }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerTwoTriangle[8] === false ? (
                <section></section>
              ) : (
                <img
                  className="card-on-board"
                  key={playerTwoTriangle[8].code}
                  alt={playerTwoTriangle[8].code}
                  src={
                    revealed[8]
                      ? playerTwoTriangle[8].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[8] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerTwoTriangle[8], 8);
                    }
                  }}
                />
              )}
            </section>
          </section>
          <section className="player-one-board-two">
            <section className="player-one-square">
              {playerTwoTriangle[4] === false ? (
                <section></section>
              ) : (
                <img
                  className="card-on-board"
                  key={playerTwoTriangle[4].code}
                  alt={playerTwoTriangle[4].code}
                  src={
                    revealed[4]
                      ? playerTwoTriangle[4].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[4] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerTwoTriangle[4], 4);
                    }
                  }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerTwoTriangle[5] === false ? (
                <section></section>
              ) : (
                <img
                  className="card-on-board"
                  key={playerTwoTriangle[5].code}
                  alt={playerTwoTriangle[5].code}
                  src={
                    revealed[5]
                      ? playerTwoTriangle[5].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[5] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerTwoTriangle[5], 5);
                    }
                  }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerTwoTriangle[6] === false ? (
                <section></section>
              ) : (
                <img
                  className="card-on-board"
                  key={playerTwoTriangle[6].code}
                  alt={playerTwoTriangle[6].code}
                  src={
                    revealed[6]
                      ? playerTwoTriangle[6].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[6] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerTwoTriangle[6], 6);
                    }
                  }}
                />
              )}
            </section>
          </section>
          <section className="player-one-board-one">
            <section className="player-one-square">
              {playerTwoTriangle[0] === false ? (
                <section></section>
              ) : (
                <img
                  className="card-on-board"
                  key={playerTwoTriangle[0].code}
                  alt={playerTwoTriangle[0].code}
                  src={
                    revealed[0]
                      ? playerTwoTriangle[0].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[0] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerTwoTriangle[0], 0);
                    }
                  }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerTwoTriangle[1] === false ? (
                <section></section>
              ) : (
                <img
                  className="card-on-board"
                  key={playerTwoTriangle[1].code}
                  alt={playerTwoTriangle[1].code}
                  src={
                    revealed[1]
                      ? playerTwoTriangle[1].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[1] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerTwoTriangle[1], 1);
                    }
                  }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerTwoTriangle[2] === false ? (
                <section></section>
              ) : (
                <img
                  className="card-on-board"
                  key={playerTwoTriangle[2].code}
                  alt={playerTwoTriangle[2].code}
                  src={
                    revealed[2]
                      ? playerTwoTriangle[2].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[2] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerTwoTriangle[2], 2);
                    }
                  }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerTwoTriangle[3] === false ? (
                <section></section>
              ) : (
                <img
                  className="card-on-board"
                  key={playerTwoTriangle[3].code}
                  alt={playerTwoTriangle[3].code}
                  src={
                    revealed[3]
                      ? playerTwoTriangle[3].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[3] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerTwoTriangle[3], 3);
                    }
                  }}
                />
              )}
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

import { useContext, useEffect, useState } from "react";
import { playerTwoTriangleContext } from "../contexts/playerTwoTriangle";
import { thisUserContext } from "../contexts/thisUser";
import { selectedCardContext } from "../contexts/selectedCard";
import { socket } from "../socket";
import { currentTurnContext } from "../contexts/currentTurn";
import { cardInBattleContext } from "../contexts/cardInBattle";
import { opposingCardContext } from "../contexts/opposingCard";
import { currentUsersContext } from "../contexts/currentUsers";
import { roomIdContext } from "../contexts/roomId";

export const PlayerTwoBoardTriangle = () => {
  const { playerTwoTriangle } = useContext(playerTwoTriangleContext);
  const { thisUser } = useContext(thisUserContext);
  const { selectedCard } = useContext(selectedCardContext);
  const { currentTurn } = useContext(currentTurnContext);
  const { cardInBattle } = useContext(cardInBattleContext);
  const { opposingCard } = useContext(opposingCardContext);
  const { currentUsers } = useContext(currentUsersContext);
  const { roomId } = useContext(roomIdContext);

  const [revealed, setRevealed] = useState(
    new Array(playerTwoTriangle.length).fill(false)
  );
  const [isTileGone, setIsTileGone] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleBattle = (selectedCard, opposingCard, tileIndex) => {
    socket.emit("cardInBattle", selectedCard, roomId);
    socket.emit("opposingCardHighlight", opposingCard, roomId);
    let selectedCardVal = selectedCard.value;
    let opposingCardVal = opposingCard.value;

    let aceLoss = false;

    if (selectedCardVal === "JACK") {
      selectedCardVal = 11;
    } else if (selectedCardVal === "QUEEN") {
      selectedCardVal = 12;
    } else if (selectedCardVal === "KING") {
      selectedCardVal = 13;
    } else if (selectedCardVal === "ACE") {
      selectedCardVal = 14;
    }

    if (opposingCardVal === "JACK") {
      opposingCardVal = 11;
    } else if (opposingCardVal === "QUEEN") {
      opposingCardVal = 12;
    } else if (opposingCardVal === "KING") {
      opposingCardVal = 13;
    } else if (opposingCardVal === "ACE") {
      opposingCardVal = 14;
    }

    let intParsedSelected = parseInt(selectedCardVal);
    let intParsedOpposing = parseInt(opposingCardVal);

    if (intParsedOpposing === 14) {
      let aceSuit = opposingCard.suit;
      if (intParsedSelected > 10 && selectedCard.suit === aceSuit) {
        aceLoss = true;
      }
    }

    setTimeout(() => {
      if (intParsedSelected >= intParsedOpposing || aceLoss) {
        if (intParsedSelected > 10) {
          socket.emit("playerOneDiscard", selectedCard, roomId);
          socket.emit("playerTwoTileDiscard", tileIndex, opposingCard, roomId);
        }
        if (intParsedOpposing <= 10) {
          socket.emit("cardToPlayerOne", opposingCard, roomId);
          socket.emit("playerTwoLostTile", tileIndex, roomId);
        }
        if (tileIndex === 9) {
          socket.emit("gameWon", currentUsers[0], roomId);
        }
        setIsTileGone((previous) => {
          let arrayCopy = [...previous];
          arrayCopy[tileIndex] = true;
          return arrayCopy;
        });
        socket.emit("turnSwitch", currentTurn, roomId);
      } else {
        if (intParsedSelected > 10) {
          socket.emit("playerOneDiscard", selectedCard, roomId);
        } else {
          socket.emit("playerOneLostCard", selectedCard, roomId);
          socket.emit("cardToPlayerTwo", selectedCard, roomId);
        }
        socket.emit("turnSwitch", currentTurn, roomId);
      }
    }, 2000);
  };

  return (
    <section className="player-one-board">
      {thisUser === "playerTwo" ? (
        <section>
          <section className="player-one-board-one">
            <section className="player-one-square">
              {playerTwoTriangle[0] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[0].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[0].code}
                  alt={playerTwoTriangle[0].code}
                  src={
                    thisUser === "playerTwo"
                      ? playerTwoTriangle[0].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerTwoTriangle[1] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[1].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[1].code}
                  alt={playerTwoTriangle[1].code}
                  src={
                    thisUser === "playerTwo"
                      ? playerTwoTriangle[1].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerTwoTriangle[2] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[2].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[2].code}
                  alt={playerTwoTriangle[2].code}
                  src={
                    thisUser === "playerTwo"
                      ? playerTwoTriangle[2].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerTwoTriangle[3] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[3].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[3].code}
                  alt={playerTwoTriangle[3].code}
                  src={
                    thisUser === "playerTwo"
                      ? playerTwoTriangle[3].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
          </section>
          <section className="player-one-board-two">
            <section className="player-one-square">
              {playerTwoTriangle[4] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[4].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[4].code}
                  alt={playerTwoTriangle[4].code}
                  src={
                    thisUser === "playerTwo"
                      ? playerTwoTriangle[4].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerTwoTriangle[5] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[5].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[5].code}
                  alt={playerTwoTriangle[5].code}
                  src={
                    thisUser === "playerTwo"
                      ? playerTwoTriangle[5].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerTwoTriangle[6] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[6].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[6].code}
                  alt={playerTwoTriangle[6].code}
                  src={
                    thisUser === "playerTwo"
                      ? playerTwoTriangle[6].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
          </section>
          <section className="player-one-board-three">
            <section className="player-one-square">
              {playerTwoTriangle[7] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[7].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[7].code}
                  alt={playerTwoTriangle[7].code}
                  src={
                    thisUser === "playerTwo"
                      ? playerTwoTriangle[7].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerTwoTriangle[8] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[8].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[8].code}
                  alt={playerTwoTriangle[8].code}
                  src={
                    thisUser === "playerTwo"
                      ? playerTwoTriangle[8].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
          </section>
          <section className="player-one-board-four">
            <section className="player-one-square">
              {playerTwoTriangle[9] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[9].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[9].code}
                  alt={playerTwoTriangle[9].code}
                  src={
                    thisUser === "playerTwo"
                      ? playerTwoTriangle[9].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
          </section>
        </section>
      ) : (
        <section>
          <section className="player-one-board-four">
            <section className="player-one-square">
              {playerTwoTriangle[9] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[9].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[9].code}
                  alt={playerTwoTriangle[9].code}
                  src={
                    revealed[9]
                      ? playerTwoTriangle[9].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[9] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne" &&
                      isTileGone[7] &&
                      isTileGone[8]
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
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[7].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[7].code}
                  alt={playerTwoTriangle[7].code}
                  src={
                    revealed[7]
                      ? playerTwoTriangle[7].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[7] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne" &&
                      isTileGone[4] &&
                      isTileGone[5] &&
                      isTileGone[6]
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
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[8].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[8].code}
                  alt={playerTwoTriangle[8].code}
                  src={
                    revealed[8]
                      ? playerTwoTriangle[8].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[8] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne" &&
                      isTileGone[4] &&
                      isTileGone[5] &&
                      isTileGone[6]
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
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[4].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[4].code}
                  alt={playerTwoTriangle[4].code}
                  src={
                    revealed[4]
                      ? playerTwoTriangle[4].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[4] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne" &&
                      isTileGone[0] &&
                      isTileGone[1] &&
                      isTileGone[2] &&
                      isTileGone[3]
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
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[5].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[5].code}
                  alt={playerTwoTriangle[5].code}
                  src={
                    revealed[5]
                      ? playerTwoTriangle[5].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[5] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne" &&
                      isTileGone[0] &&
                      isTileGone[1] &&
                      isTileGone[2] &&
                      isTileGone[3]
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
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[6].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[6].code}
                  alt={playerTwoTriangle[6].code}
                  src={
                    revealed[6]
                      ? playerTwoTriangle[6].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[6] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerOne" &&
                      currentTurn === "playerOne" &&
                      isTileGone[0] &&
                      isTileGone[1] &&
                      isTileGone[2] &&
                      isTileGone[3]
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
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[0].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[0].code}
                  alt={playerTwoTriangle[0].code}
                  src={
                    revealed[0]
                      ? playerTwoTriangle[0].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[0] ? "2px solid red" : "none",
                  }}
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
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[1].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[1].code}
                  alt={playerTwoTriangle[1].code}
                  src={
                    revealed[1]
                      ? playerTwoTriangle[1].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[1] ? "2px solid red" : "none",
                  }}
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
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[2].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[2].code}
                  alt={playerTwoTriangle[2].code}
                  src={
                    revealed[2]
                      ? playerTwoTriangle[2].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[2] ? "2px solid red" : "none",
                  }}
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
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerTwoTriangle[3].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerTwoTriangle[3].code}
                  alt={playerTwoTriangle[3].code}
                  src={
                    revealed[3]
                      ? playerTwoTriangle[3].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[3] ? "2px solid red" : "none",
                  }}
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

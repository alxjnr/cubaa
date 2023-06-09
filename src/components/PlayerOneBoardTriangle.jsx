import { useContext, useState } from "react";
import { playerOneTriangleContext } from "../contexts/playerOneTriangle";
import { thisUserContext } from "../contexts/thisUser";
import { selectedCardContext } from "../contexts/selectedCard";
import { socket } from "../socket";
import { currentTurnContext } from "../contexts/currentTurn";
import { opposingCardContext } from "../contexts/opposingCard";
import { currentUsersContext } from "../contexts/currentUsers";
import { roomIdContext } from "../contexts/roomId";

export const PlayerOneBoardTriangle = () => {
  const { playerOneTriangle } = useContext(playerOneTriangleContext);
  const { thisUser } = useContext(thisUserContext);
  const { selectedCard } = useContext(selectedCardContext);
  const { currentTurn } = useContext(currentTurnContext);
  const { opposingCard } = useContext(opposingCardContext);
  const { currentUsers } = useContext(currentUsersContext);
  const { roomId } = useContext(roomIdContext);

  const [revealed, setRevealed] = useState(
    new Array(playerOneTriangle.length).fill(false)
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
          socket.emit("playerTwoDiscard", selectedCard, roomId);
          socket.emit("playerOneTileDiscard", tileIndex, opposingCard, roomId);
        }
        if (intParsedOpposing <= 10) {
          socket.emit("cardToPlayerTwo", opposingCard, roomId);
          socket.emit("playerOneLostTile", tileIndex, roomId);
        }
        socket.emit("turnSwitch", currentTurn, roomId);
        if (tileIndex === 9) {
          socket.emit("gameWon", currentUsers[1], roomId);
        }
        setIsTileGone((previous) => {
          let arrayCopy = [...previous];
          arrayCopy[tileIndex] = true;
          return arrayCopy;
        });
      } else {
        if (intParsedSelected > 10) {
          socket.emit("playerTwoDiscard", selectedCard, roomId);
        } else {
          socket.emit("playerTwoLostCard", selectedCard, roomId);
          socket.emit("cardToPlayerOne", selectedCard, roomId);
        }
        socket.emit("turnSwitch", currentTurn, roomId);
      }
    }, 2000);
  };

  return (
    <section className="player-one-board">
      {thisUser === "playerOne" ? (
        <section>
          <section className="player-one-board-one">
            <section className="player-one-square">
              {playerOneTriangle[0] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[0].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[0].code}
                  alt={playerOneTriangle[0].code}
                  src={
                    thisUser === "playerOne"
                      ? playerOneTriangle[0].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                  onClick={() => {}}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerOneTriangle[1] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[1].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[1].code}
                  alt={playerOneTriangle[1].code}
                  src={
                    thisUser === "playerOne"
                      ? playerOneTriangle[1].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerOneTriangle[2] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[2].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[2].code}
                  alt={playerOneTriangle[2].code}
                  src={
                    thisUser === "playerOne"
                      ? playerOneTriangle[2].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerOneTriangle[3] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[3].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[3].code}
                  alt={playerOneTriangle[3].code}
                  src={
                    thisUser === "playerOne"
                      ? playerOneTriangle[3].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
          </section>
          <section className="player-one-board-two">
            <section className="player-one-square">
              {playerOneTriangle[4] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[4].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[4].code}
                  alt={playerOneTriangle[4].code}
                  src={
                    thisUser === "playerOne"
                      ? playerOneTriangle[4].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerOneTriangle[5] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[5].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[5].code}
                  alt={playerOneTriangle[5].code}
                  src={
                    thisUser === "playerOne"
                      ? playerOneTriangle[5].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerOneTriangle[6] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[6].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[6].code}
                  alt={playerOneTriangle[6].code}
                  src={
                    thisUser === "playerOne"
                      ? playerOneTriangle[6].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
          </section>
          <section className="player-one-board-three">
            <section className="player-one-square">
              {playerOneTriangle[7] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[7].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[7].code}
                  alt={playerOneTriangle[7].code}
                  src={
                    thisUser === "playerOne"
                      ? playerOneTriangle[7].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerOneTriangle[8] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[8].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[8].code}
                  alt={playerOneTriangle[8].code}
                  src={
                    thisUser === "playerOne"
                      ? playerOneTriangle[8].image
                      : "/images/back-of-card.png"
                  }
                  style={{ width: "50px" }}
                />
              )}
            </section>
          </section>
          <section className="player-one-board-four">
            <section className="player-one-square">
              {playerOneTriangle[9] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[9].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[9].code}
                  alt={playerOneTriangle[9].code}
                  src={
                    thisUser === "playerOne"
                      ? playerOneTriangle[9].image
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
              {playerOneTriangle[9] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[9].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[9].code}
                  alt={playerOneTriangle[9].code}
                  src={
                    revealed[9]
                      ? playerOneTriangle[9].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[9] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerTwo" &&
                      currentTurn === "playerTwo" &&
                      isTileGone[7] &&
                      isTileGone[8]
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[9] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerOneTriangle[9], 9);
                    }
                  }}
                />
              )}
            </section>
          </section>
          <section className="player-one-board-three">
            <section className="player-one-square">
              {playerOneTriangle[7] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[7].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[7].code}
                  alt={playerOneTriangle[7].code}
                  src={
                    revealed[7]
                      ? playerOneTriangle[7].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[7] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerTwo" &&
                      currentTurn === "playerTwo" &&
                      isTileGone[4] &&
                      isTileGone[5] &&
                      isTileGone[6]
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[7] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerOneTriangle[7], 7);
                    }
                  }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerOneTriangle[8] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[8].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[8].code}
                  alt={playerOneTriangle[8].code}
                  src={
                    revealed[8]
                      ? playerOneTriangle[8].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[8] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerTwo" &&
                      currentTurn === "playerTwo" &&
                      isTileGone[4] &&
                      isTileGone[5] &&
                      isTileGone[6]
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[8] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerOneTriangle[8], 8);
                    }
                  }}
                />
              )}
            </section>
          </section>
          <section className="player-one-board-two">
            <section className="player-one-square">
              {playerOneTriangle[4] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[4].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[4].code}
                  alt={playerOneTriangle[4].code}
                  src={
                    revealed[4]
                      ? playerOneTriangle[4].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[4] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerTwo" &&
                      currentTurn === "playerTwo" &&
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
                      handleBattle(selectedCard, playerOneTriangle[4], 4);
                    }
                  }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerOneTriangle[5] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[5].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[5].code}
                  alt={playerOneTriangle[5].code}
                  src={
                    revealed[5]
                      ? playerOneTriangle[5].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[5] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerTwo" &&
                      currentTurn === "playerTwo" &&
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
                      handleBattle(selectedCard, playerOneTriangle[5], 5);
                    }
                  }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerOneTriangle[6] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[6].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[6].code}
                  alt={playerOneTriangle[6].code}
                  src={
                    revealed[6]
                      ? playerOneTriangle[6].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[6] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerTwo" &&
                      currentTurn === "playerTwo" &&
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
                      handleBattle(selectedCard, playerOneTriangle[6], 6);
                    }
                  }}
                />
              )}
            </section>
          </section>
          <section className="player-one-board-one">
            <section className="player-one-square">
              {playerOneTriangle[0] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[0].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[0].code}
                  alt={playerOneTriangle[0].code}
                  src={
                    revealed[0]
                      ? playerOneTriangle[0].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[0] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerTwo" &&
                      currentTurn === "playerTwo"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[0] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerOneTriangle[0], 0);
                    }
                  }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerOneTriangle[1] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[1].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[1].code}
                  alt={playerOneTriangle[1].code}
                  src={
                    revealed[1]
                      ? playerOneTriangle[1].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[1] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerTwo" &&
                      currentTurn === "playerTwo"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[1] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerOneTriangle[1], 1);
                    }
                  }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerOneTriangle[2] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[2].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[2].code}
                  alt={playerOneTriangle[2].code}
                  src={
                    revealed[2]
                      ? playerOneTriangle[2].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[2] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerTwo" &&
                      currentTurn === "playerTwo"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[2] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerOneTriangle[2], 2);
                    }
                  }}
                />
              )}
            </section>
            <section className="player-one-square">
              {playerOneTriangle[3] === false ? (
                <section className="card-on-board"></section>
              ) : (
                <img
                  className={
                    opposingCard.code === playerOneTriangle[3].code
                      ? "card-on-board-highlighted"
                      : "card-on-board"
                  }
                  key={playerOneTriangle[3].code}
                  alt={playerOneTriangle[3].code}
                  src={
                    revealed[3]
                      ? playerOneTriangle[3].image
                      : "/images/back-of-card.png"
                  }
                  style={{
                    width: "50px",
                    // border: revealed[3] ? "2px solid red" : "none",
                  }}
                  onClick={() => {
                    if (
                      selectedCard &&
                      thisUser === "playerTwo" &&
                      currentTurn === "playerTwo"
                    ) {
                      setRevealed((prev) => {
                        const updatedRevealed = [...prev];
                        updatedRevealed[3] = true;
                        return updatedRevealed;
                      });
                      handleBattle(selectedCard, playerOneTriangle[3], 3);
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

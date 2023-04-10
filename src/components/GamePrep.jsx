import { useContext, useEffect, useState } from "react";
import { playerOneHandContext } from "../contexts/playerOneHand";
import { playerTwoHandContext } from "../contexts/playerTwoHand";
import { thisUserContext } from "../contexts/thisUser";
import { playersReadyContext } from "../contexts/playersReady";
import { socket } from "../socket";
import axios from "axios";
import { GameBoard } from "./GameBoard";
import { selectedCardContext } from "../contexts/selectedCard";
import { gamePrepLoadingContext } from "../contexts/gamePrepLoading";
import { roomIdContext } from "../contexts/roomId";

export const GamePrep = () => {
  const { playerOneHand } = useContext(playerOneHandContext);
  const { playerTwoHand } = useContext(playerTwoHandContext);
  const { playersReady } = useContext(playersReadyContext);
  const { thisUser } = useContext(thisUserContext);
  const { roomId } = useContext(roomIdContext);

  // const [selectedCard, setSelectedCard] = useState({});
  const { selectedCard, setSelectedCard } = useContext(selectedCardContext);

  const { gamePrepLoading } = useContext(gamePrepLoadingContext);
  const [squaresArr, setSquaresArr] = useState([]);
  // const [cardHighlighted, setCardHighlighted] = useState(false);

  const drawToPlayer = (cards) => {
    socket.emit("drawCards", cards, roomId);
  };

  const modifyHand = (newHand, player) => {
    socket.emit("modifyHand", newHand, player, roomId);
  };

  const removeCardFromHand = () => {
    if (thisUser === "playerOne") {
      const newHand = playerOneHand.filter((card) => {
        return selectedCard.code !== card.code;
      });
      modifyHand(newHand, "playerOne");
    } else {
      const newHand = playerTwoHand.filter((card) => {
        return selectedCard.code !== card.code;
      });
      modifyHand(newHand, "playerTwo");
    }
  };

  const returnToPlayer = (card) => {
    if (thisUser === "playerOne") {
      socket.emit("cardToPlayerOne", card, roomId);
    } else if (thisUser === "playerTwo") {
      socket.emit("cardToPlayerTwo", card, roomId);
    }
  };

  const playerReady = () => {
    if (squaresArr) socket.emit("playerReady", thisUser, roomId);
  };

  const setTriangle = () => {
    socket.emit("setTriangle", thisUser, squaresArr, roomId);
  };

  useEffect(() => {
    if (thisUser === "playerOne") {
      axios
        .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then((res) => {
          let deck_id = res.data.deck_id;
          axios
            .get(
              `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=52`
            )
            .then((res) => {
              drawToPlayer(res.data.cards);
            });
        });
    }
  }, []);

  return (
    <section>
      {gamePrepLoading ? (
        <h2>loading...</h2>
      ) : playersReady ? (
        <GameBoard />
      ) : (
        <section>
          <section className="player-one-board">
            <section className="player-one-board-one">
              <section
                className="player-one-square"
                onClick={() => {
                  if (!squaresArr[0]) {
                    setSquaresArr((current) => {
                      const updatedArr = [...current];
                      updatedArr[0] = selectedCard;
                      return updatedArr;
                    });
                    if (selectedCard) {
                      removeCardFromHand();
                      setSelectedCard({});
                    }
                  }
                }}
              >
                {!squaresArr[0] ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={squaresArr[0].code}
                    alt={squaresArr[0].code}
                    src={squaresArr[0].image}
                    style={{ width: "50px" }}
                    onClick={() => {
                      returnToPlayer(squaresArr[0]);
                      setSquaresArr((current) => {
                        const updatedArr = [...current];
                        updatedArr[0] = null;
                        return updatedArr;
                      });
                    }}
                  />
                )}
              </section>
              <section
                className="player-one-square"
                onClick={() => {
                  if (!squaresArr[1]) {
                    setSquaresArr((current) => {
                      const updatedArr = [...current];
                      updatedArr[1] = selectedCard;
                      return updatedArr;
                    });
                    if (selectedCard) {
                      removeCardFromHand();
                      setSelectedCard({});
                    }
                  }
                }}
              >
                {!squaresArr[1] ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={squaresArr[1].code}
                    alt={squaresArr[1].code}
                    src={squaresArr[1].image}
                    style={{ width: "50px" }}
                    onClick={() => {
                      returnToPlayer(squaresArr[1]);
                      setSquaresArr((current) => {
                        const updatedArr = [...current];
                        updatedArr[1] = null;
                        return updatedArr;
                      });
                    }}
                  />
                )}
              </section>
              <section
                className="player-one-square"
                onClick={() => {
                  if (!squaresArr[2]) {
                    setSquaresArr((current) => {
                      const updatedArr = [...current];
                      updatedArr[2] = selectedCard;
                      return updatedArr;
                    });
                    if (selectedCard) {
                      removeCardFromHand();
                      setSelectedCard({});
                    }
                  }
                }}
              >
                {!squaresArr[2] ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={squaresArr[2].code}
                    alt={squaresArr[2].code}
                    src={squaresArr[2].image}
                    style={{ width: "50px" }}
                    onClick={() => {
                      returnToPlayer(squaresArr[2]);
                      setSquaresArr((current) => {
                        const updatedArr = [...current];
                        updatedArr[2] = null;
                        return updatedArr;
                      });
                    }}
                  />
                )}
              </section>
              <section
                className="player-one-square"
                onClick={() => {
                  if (!squaresArr[3]) {
                    setSquaresArr((current) => {
                      const updatedArr = [...current];
                      updatedArr[3] = selectedCard;
                      return updatedArr;
                    });
                    if (selectedCard) {
                      removeCardFromHand();
                      setSelectedCard({});
                    }
                  }
                }}
              >
                {!squaresArr[3] ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={squaresArr[3].code}
                    alt={squaresArr[3].code}
                    src={squaresArr[3].image}
                    style={{ width: "50px" }}
                    onClick={() => {
                      returnToPlayer(squaresArr[3]);
                      setSquaresArr((current) => {
                        const updatedArr = [...current];
                        updatedArr[3] = null;
                        return updatedArr;
                      });
                    }}
                  />
                )}
              </section>
            </section>
            <section className="player-one-board-two">
              <section
                className="player-one-square"
                onClick={() => {
                  if (!squaresArr[4]) {
                    setSquaresArr((current) => {
                      const updatedArr = [...current];
                      updatedArr[4] = selectedCard;
                      return updatedArr;
                    });
                    if (selectedCard) {
                      removeCardFromHand();
                      setSelectedCard({});
                    }
                  }
                }}
              >
                {!squaresArr[4] ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={squaresArr[4].code}
                    alt={squaresArr[4].code}
                    src={squaresArr[4].image}
                    style={{ width: "50px" }}
                    onClick={() => {
                      returnToPlayer(squaresArr[4]);
                      setSquaresArr((current) => {
                        const updatedArr = [...current];
                        updatedArr[4] = null;
                        return updatedArr;
                      });
                    }}
                  />
                )}
              </section>
              <section
                className="player-one-square"
                onClick={() => {
                  if (!squaresArr[5]) {
                    setSquaresArr((current) => {
                      const updatedArr = [...current];
                      updatedArr[5] = selectedCard;
                      return updatedArr;
                    });
                    if (selectedCard) {
                      removeCardFromHand();
                      setSelectedCard({});
                    }
                  }
                }}
              >
                {!squaresArr[5] ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={squaresArr[5].code}
                    alt={squaresArr[5].code}
                    src={squaresArr[5].image}
                    style={{ width: "50px" }}
                    onClick={() => {
                      returnToPlayer(squaresArr[5]);
                      setSquaresArr((current) => {
                        const updatedArr = [...current];
                        updatedArr[5] = null;
                        return updatedArr;
                      });
                    }}
                  />
                )}
              </section>
              <section
                className="player-one-square"
                onClick={() => {
                  if (!squaresArr[6]) {
                    setSquaresArr((current) => {
                      const updatedArr = [...current];
                      updatedArr[6] = selectedCard;
                      return updatedArr;
                    });
                    if (selectedCard) {
                      removeCardFromHand();
                      setSelectedCard({});
                    }
                  }
                }}
              >
                {!squaresArr[6] ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={squaresArr[6].code}
                    alt={squaresArr[6].code}
                    src={squaresArr[6].image}
                    style={{ width: "50px" }}
                    onClick={() => {
                      returnToPlayer(squaresArr[6]);
                      setSquaresArr((current) => {
                        const updatedArr = [...current];
                        updatedArr[6] = null;
                        return updatedArr;
                      });
                    }}
                  />
                )}
              </section>
            </section>
            <section className="player-one-board-three">
              <section
                className="player-one-square"
                onClick={() => {
                  if (!squaresArr[7]) {
                    setSquaresArr((current) => {
                      const updatedArr = [...current];
                      updatedArr[7] = selectedCard;
                      return updatedArr;
                    });
                    if (selectedCard) {
                      removeCardFromHand();
                      setSelectedCard({});
                    }
                  }
                }}
              >
                {!squaresArr[7] ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={squaresArr[7].code}
                    alt={squaresArr[7].code}
                    src={squaresArr[7].image}
                    style={{ width: "50px" }}
                    onClick={() => {
                      returnToPlayer(squaresArr[7]);
                      setSquaresArr((current) => {
                        const updatedArr = [...current];
                        updatedArr[7] = null;
                        return updatedArr;
                      });
                    }}
                  />
                )}
              </section>
              <section
                className="player-one-square"
                onClick={() => {
                  if (!squaresArr[8]) {
                    setSquaresArr((current) => {
                      const updatedArr = [...current];
                      updatedArr[8] = selectedCard;
                      return updatedArr;
                    });
                    if (selectedCard) {
                      removeCardFromHand();
                      setSelectedCard({});
                    }
                  }
                }}
              >
                {!squaresArr[8] ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={squaresArr[8].code}
                    alt={squaresArr[8].code}
                    src={squaresArr[8].image}
                    style={{ width: "50px" }}
                    onClick={() => {
                      returnToPlayer(squaresArr[8]);
                      setSquaresArr((current) => {
                        const updatedArr = [...current];
                        updatedArr[8] = null;
                        return updatedArr;
                      });
                    }}
                  />
                )}
              </section>
            </section>
            <section className="player-one-board-four">
              <section
                className="player-one-square"
                onClick={() => {
                  if (!squaresArr[9]) {
                    setSquaresArr((current) => {
                      const updatedArr = [...current];
                      updatedArr[9] = selectedCard;
                      return updatedArr;
                    });
                    if (selectedCard) {
                      removeCardFromHand();
                      setSelectedCard({});
                    }
                  }
                }}
              >
                {!squaresArr[9] ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={squaresArr[9].code}
                    alt={squaresArr[9].code}
                    src={squaresArr[9].image}
                    style={{ width: "50px" }}
                    onClick={() => {
                      returnToPlayer(squaresArr[9]);
                      setSquaresArr((current) => {
                        const updatedArr = [...current];
                        updatedArr[9] = null;
                        return updatedArr;
                      });
                    }}
                  />
                )}
              </section>
            </section>
          </section>
          <section className="card-hand">
            {thisUser === "playerOne"
              ? playerOneHand.map((card) => {
                  return (
                    <img
                      className={
                        selectedCard === card
                          ? "card-on-board-selected"
                          : "card-on-board"
                      }
                      key={card.code}
                      alt={card.code}
                      src={card.image}
                      onClick={() => {
                        setSelectedCard(card);
                      }}
                    />
                  );
                })
              : playerTwoHand.map((card) => {
                  return (
                    <img
                      className={
                        selectedCard === card
                          ? "card-on-board-selected"
                          : "card-on-board"
                      }
                      key={card.code}
                      alt={card.code}
                      src={card.image}
                      onClick={() => {
                        setSelectedCard(card);
                      }}
                    />
                  );
                })}
          </section>
          <button
            style={{ marginTop: "10px" }}
            onClick={() => {
              playerReady();
              setTriangle();
            }}
          >
            ready
          </button>
        </section>
      )}
    </section>
  );
};

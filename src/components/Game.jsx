import { useContext, useEffect, useState } from "react";
import { playerOneHandContext } from "../contexts/playerOneHand";
import { playerTwoHandContext } from "../contexts/playerTwoHand";
import { thisUserContext } from "../contexts/thisUser";
import { socket } from "../socket";
import axios from "axios";

export const Game = () => {
  const { playerOneHand } = useContext(playerOneHandContext);
  const { playerTwoHand } = useContext(playerTwoHandContext);
  const { thisUser } = useContext(thisUserContext);
  const [selectedCard, setSelectedCard] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [square1, setSquare1] = useState();
  const [square2, setSquare2] = useState();
  const [square3, setSquare3] = useState();
  const [square4, setSquare4] = useState();
  const [square5, setSquare5] = useState();
  const [square6, setSquare6] = useState();
  const [square7, setSquare7] = useState();
  const [square8, setSquare8] = useState();
  const [square9, setSquare9] = useState();
  const [square10, setSquare10] = useState();

  const drawToPlayer = (cards, player) => {
    socket.emit("drawCards", cards, player);
  };

  const modifyHand = (newHand, player) => {
    socket.emit("modifyHand", newHand, player);
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

  useEffect(() => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((res) => {
        let deck_id = res.data.deck_id;
        axios
          .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=16`)
          .then((res) => {
            if (thisUser === "playerOne") {
              drawToPlayer(res.data.cards, "playerOne");
            } else {
              axios
                .get(
                  `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=16`
                )
                .then((res) => {
                  drawToPlayer(res.data.cards, "playerTwo");
                });
            }
            setIsLoading(false);
          });
      });
  }, []);

  return (
    <section>
      {isLoading ? (
        <h2>loading...</h2>
      ) : (
        <section>
          <section className="player-one-board">
            <section className="player-one-board-one">
              <section
                className="player-one-square"
                onClick={() => {
                  if (!square1) {
                    setSquare1(selectedCard);
                    removeCardFromHand();
                  }
                }}
              >
                {!square1 ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={square1.code}
                    alt={square1.code}
                    src={square1.image}
                    style={{ width: "50px" }}
                  />
                )}
              </section>
              <section
                className="player-one-square"
                onClick={() => {
                  if (!square2) {
                    setSquare2(selectedCard);
                    removeCardFromHand();
                  }
                }}
              >
                {!square2 ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={square2.code}
                    alt={square2.code}
                    src={square2.image}
                    style={{ width: "50px" }}
                  />
                )}
              </section>
              <section
                className="player-one-square"
                onClick={() => {
                  if (!square3) {
                    setSquare3(selectedCard);
                    removeCardFromHand();
                  }
                }}
              >
                {!square3 ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={square3.code}
                    alt={square3.code}
                    src={square3.image}
                    style={{ width: "50px" }}
                  />
                )}
              </section>
              <section
                className="player-one-square"
                onClick={() => {
                  if (!square4) {
                    setSquare4(selectedCard);
                    removeCardFromHand();
                  }
                }}
              >
                {!square4 ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={square4.code}
                    alt={square4.code}
                    src={square4.image}
                    style={{ width: "50px" }}
                  />
                )}
              </section>
            </section>
            <section className="player-one-board-two">
              <section
                className="player-one-square"
                onClick={() => {
                  if (!square5) {
                    setSquare5(selectedCard);
                    removeCardFromHand();
                  }
                }}
              >
                {!square5 ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={square5.code}
                    alt={square5.code}
                    src={square5.image}
                    style={{ width: "50px" }}
                  />
                )}
              </section>
              <section
                className="player-one-square"
                onClick={() => {
                  if (!square6) {
                    setSquare6(selectedCard);
                    removeCardFromHand();
                  }
                }}
              >
                {!square6 ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={square6.code}
                    alt={square6.code}
                    src={square6.image}
                    style={{ width: "50px" }}
                  />
                )}
              </section>
              <section
                className="player-one-square"
                onClick={() => {
                  if (!square7) {
                    setSquare7(selectedCard);
                    removeCardFromHand();
                  }
                }}
              >
                {!square7 ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={square7.code}
                    alt={square7.code}
                    src={square7.image}
                    style={{ width: "50px" }}
                  />
                )}
              </section>
            </section>
            <section className="player-one-board-three">
              <section
                className="player-one-square"
                onClick={() => {
                  if (!square8) {
                    setSquare8(selectedCard);
                    removeCardFromHand();
                  }
                }}
              >
                {!square8 ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={square8.code}
                    alt={square8.code}
                    src={square8.image}
                    style={{ width: "50px" }}
                  />
                )}
              </section>
              <section
                className="player-one-square"
                onClick={() => {
                  if (!square9) {
                    setSquare9(selectedCard);
                    removeCardFromHand();
                  }
                }}
              >
                {!square9 ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={square9.code}
                    alt={square9.code}
                    src={square9.image}
                    style={{ width: "50px" }}
                  />
                )}
              </section>
            </section>
            <section className="player-one-board-four">
              <section
                className="player-one-square"
                onClick={() => {
                  if (!square10) {
                    setSquare10(selectedCard);
                    removeCardFromHand();
                  }
                }}
              >
                {!square10 ? (
                  <section></section>
                ) : (
                  <img
                    className="card-on-board"
                    key={square10.code}
                    alt={square10.code}
                    src={square10.image}
                    style={{ width: "50px" }}
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
                      className="card-on-board"
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
                      className="card-on-board"
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
        </section>
      )}
    </section>
  );
};

import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { Home } from "./components/Home";
import { playerOneHandContext } from "./contexts/playerOneHand";
import { playerTwoHandContext } from "./contexts/playerTwoHand";
import { thisUserContext } from "./contexts/thisUser";
import { currentUsersContext } from "./contexts/currentUsers";
import { playersReadyContext } from "./contexts/playersReady";
import { playerOneTriangleContext } from "./contexts/playerOneTriangle";
import { playerTwoTriangleContext } from "./contexts/playerTwoTriangle";
import { selectedCardContext } from "./contexts/selectedCard";
import { currentTurnContext } from "./contexts/currentTurn";
import { cardInBattleContext } from "./contexts/cardInBattle";
import { globalDeckContext } from "./contexts/globalDeck";
import { gamePrepLoadingContext } from "./contexts/gamePrepLoading";
import axios from "axios";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isPlayingGame, setIsPlayingGame] = useState(false);

  const [playerOneHand, setPlayerOneHand] = useState([]);
  const [playerTwoHand, setPlayerTwoHand] = useState([]);

  const [playerOneTriangle, setPlayerOneTriangle] = useState([]);
  const [playerTwoTriangle, setPlayerTwoTriangle] = useState([]);

  const [currentUsers, setCurrentUsers] = useState([]);
  const [thisUser, setThisUser] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [playersReady, setPlayersReady] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTurn, setCurrentTurn] = useState("playerOne");
  const [cardInBattle, setCardInBattle] = useState({});
  const [globalDeck, setGlobalDeck] = useState([]);
  const [gamePrepLoading, setGamePrepLoading] = useState(true);

  useEffect(() => {
    if (globalDeck.length > 0) {
      setPlayerOneHand(globalDeck.splice(0, 16));
      setPlayerTwoHand(globalDeck.splice(0, 16));
      setGamePrepLoading(false);
    }
  }, [globalDeck]);

  useEffect(() => {
    console.log("rendering");
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("addUserToLobby", (user) => {
      setCurrentUsers((current) => {
        return [...current, user];
      });
      setUserCount((current) => {
        return current + 1;
      });
    });

    socket.on("isPlayingGame", () => {
      setIsPlayingGame(true);
    });

    socket.on("drawCards", (cards) => {
      setGlobalDeck(cards);
    });

    socket.on("modifyHand", (newHand, player) => {
      if (player === "playerOne") {
        setPlayerOneHand(newHand);
      } else {
        setPlayerTwoHand(newHand);
      }
    });

    const playersReadyObj = {
      playerOneReady: false,
      playerTwoReady: false,
    };

    socket.on("playerReady", (player) => {
      if (player === "playerOne") {
        playersReadyObj.playerOneReady = true;
      } else if (player === "playerTwo") {
        playersReadyObj.playerTwoReady = true;
      }

      if (playersReadyObj.playerOneReady && playersReadyObj.playerTwoReady) {
        setTimeout(() => {
          setPlayersReady(true);
        }, 3000);
      }
    });

    socket.on("setTriangle", (player, squaresArray) => {
      if (player === "playerOne") {
        console.log("player one set");
        setPlayerOneTriangle(squaresArray);
      } else if (player === "playerTwo") {
        console.log("player two set");
        setPlayerTwoTriangle(squaresArray);
      }
    });

    socket.on("cardToPlayerTwo", (card) => {
      setPlayerTwoHand((current) => {
        return [...current, card];
      });
    });

    socket.on("playerOneLostTile", (tileIndex) => {
      setPlayerOneTriangle((prev) => {
        const updatedTriangle = [...prev];
        console.log(updatedTriangle[tileIndex]);
        updatedTriangle[tileIndex] = false;
        return updatedTriangle;
      });
    });

    socket.on("playerTwoLostTile", (tileIndex) => {
      setPlayerTwoTriangle((prev) => {
        const updatedTriangle = [...prev];
        console.log(updatedTriangle[tileIndex]);
        updatedTriangle[tileIndex] = false;
        return updatedTriangle;
      });
    });

    socket.on("cardToPlayerOne", (card) => {
      setPlayerOneHand((current) => {
        return [...current, card];
      });
    });

    socket.on("playerTwoLostCard", (cardSelected) => {
      setPlayerTwoHand((current) => {
        const currentHand = [...current];
        const selectedIndex = currentHand.findIndex(
          (card) => card.code === cardSelected.code
        );
        currentHand.splice(selectedIndex, 1);
        return currentHand;
      });
    });

    socket.on("playerOneLostCard", (cardSelected) => {
      setPlayerOneHand((current) => {
        const currentHand = [...current];
        const selectedIndex = currentHand.findIndex(
          (card) => card.code === cardSelected.code
        );
        currentHand.splice(selectedIndex, 1);
        return currentHand;
      });
    });

    socket.on("turnSwitch", (currentTurnUser) => {
      if (currentTurnUser === "playerOne") {
        setCurrentTurn("playerTwo");
      } else if (currentTurnUser === "playerTwo") {
        setCurrentTurn("playerOne");
      }

      console.log("turn switched");
    });

    socket.on("cardInBattle", (card) => {
      setCardInBattle(card);
      setTimeout(() => {
        setCardInBattle({});
      }, 2000);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("addUserToLobby");
      socket.off("connectedUsers");
      socket.off("isPlayingGame");
      socket.off("drawCards");
      socket.off("assignPlayer");
      socket.off("playerReady");
      socket.off("setTriangle");
      socket.off("cardToPlayerTwo");
      socket.off("playerOneLostTile");
      socket.off("cardToPlayerOne");
      socket.off("playerTwoLostTile");
      socket.off("playerOneLostCard");
      socket.off("playerTwoLostCard");
    };
  }, []);

  return (
    <gamePrepLoadingContext.Provider
      value={{ gamePrepLoading, setGamePrepLoading }}
    >
      <globalDeckContext.Provider value={{ globalDeck, setGlobalDeck }}>
        <cardInBattleContext.Provider value={{ cardInBattle, setCardInBattle }}>
          <currentTurnContext.Provider value={{ currentTurn, setCurrentTurn }}>
            <selectedCardContext.Provider
              value={{ selectedCard, setSelectedCard }}
            >
              <playerOneTriangleContext.Provider
                value={{ playerOneTriangle, setPlayerOneTriangle }}
              >
                <playerTwoTriangleContext.Provider
                  value={{ playerTwoTriangle, setPlayerTwoTriangle }}
                >
                  <playersReadyContext.Provider
                    value={{ playersReady, setPlayersReady }}
                  >
                    <currentUsersContext.Provider
                      value={{ currentUsers, setCurrentUsers }}
                    >
                      <playerOneHandContext.Provider
                        value={{ playerOneHand, setPlayerOneHand }}
                      >
                        <playerTwoHandContext.Provider
                          value={{ playerTwoHand, setPlayerTwoHand }}
                        >
                          <thisUserContext.Provider
                            value={{ thisUser, setThisUser }}
                          >
                            <div className="App">
                              <h2 style={{ fontSize: 20 }}>{thisUser}</h2>
                              {isConnected ? (
                                <section>
                                  <Home
                                    isPlayingGame={isPlayingGame}
                                    setIsPlayingGame={setIsPlayingGame}
                                  />
                                  <p
                                    style={{
                                      fontSize: 10,
                                      margin: "auto",
                                      textAlign: "center",
                                      marginTop: "80vw",
                                    }}
                                  >
                                    is connected {socket.id}
                                  </p>
                                </section>
                              ) : (
                                <h5>connecting...</h5>
                              )}
                            </div>
                          </thisUserContext.Provider>
                        </playerTwoHandContext.Provider>
                      </playerOneHandContext.Provider>
                    </currentUsersContext.Provider>
                  </playersReadyContext.Provider>
                </playerTwoTriangleContext.Provider>
              </playerOneTriangleContext.Provider>
            </selectedCardContext.Provider>
          </currentTurnContext.Provider>
        </cardInBattleContext.Provider>
      </globalDeckContext.Provider>
    </gamePrepLoadingContext.Provider>
  );
}

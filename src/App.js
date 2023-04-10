import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { PreLobby } from "./components/PreLobby";
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
import { playerOneRowsCheckContext } from "./contexts/playerOneRowsCheck";
import { opposingCardContext } from "./contexts/opposingCard";
import { gameOverContext } from "./contexts/gameOver";
import { Home } from "./components/Home";
import { roomIdContext } from "./contexts/roomId";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [roomId, setRoomId] = useState("");

  const [playerOneHand, setPlayerOneHand] = useState([]);
  const [playerTwoHand, setPlayerTwoHand] = useState([]);

  const [playerOneTriangle, setPlayerOneTriangle] = useState([]);
  const [playerTwoTriangle, setPlayerTwoTriangle] = useState([]);

  const [opposingCard, setOpposingCard] = useState({});
  const [gameOver, setGameOver] = useState({
    isOver: false,
    winner: "",
  });

  const [currentUsers, setCurrentUsers] = useState([]);
  const [thisUser, setThisUser] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [playersReady, setPlayersReady] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTurn, setCurrentTurn] = useState("playerOne");
  const [cardInBattle, setCardInBattle] = useState({});
  const [globalDeck, setGlobalDeck] = useState([]);
  const [gamePrepLoading, setGamePrepLoading] = useState(true);
  const [shouldRunEffect, setShouldRunEffect] = useState(true);
  const [playerOneRowsCheck, setPlayerOneRowsCheck] = useState([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (globalDeck.length > 0 && shouldRunEffect) {
      setShouldRunEffect(false);
      setGlobalDeck((prev) => {
        const prevDeck = [...prev];
        const playerOneCards = prevDeck.splice(0, 16);
        const playerTwoCards = prevDeck.splice(0, 16);
        setPlayerOneHand(playerOneCards);
        setPlayerTwoHand(playerTwoCards);
        return prevDeck;
      });
      setGamePrepLoading(false);
    }
  }, [globalDeck, shouldRunEffect]);

  useEffect(() => {
    console.log("primary useEffect rendering");
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
        console.log("here");
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

    socket.on("opposingCardHighlight", (card) => {
      setOpposingCard(card);
      setTimeout(() => {
        setOpposingCard({});
      }, 2000);
    });

    socket.on("drawFromPile", (user) => {
      setGlobalDeck((prev) => {
        const prevDeck = [...prev];
        const newCards = prevDeck.splice(0, 2);
        if (user === "playerOne") {
          setPlayerOneHand((current) => {
            return [...current, ...newCards];
          });
        } else if (user === "playerTwo") {
          setPlayerTwoHand((current) => {
            return [...current, ...newCards];
          });
        }
        return prevDeck;
      });
    });

    socket.on("playerTwoDiscard", (cardToDiscard) => {
      setPlayerTwoHand((current) => {
        const currentHand = [...current];
        const selectedIndex = currentHand.findIndex(
          (card) => card.code === cardToDiscard.code
        );
        currentHand.splice(selectedIndex, 1);
        return currentHand;
      });
      setGlobalDeck((current) => {
        return [...current, cardToDiscard];
      });
    });

    socket.on("playerOneDiscard", (cardToDiscard) => {
      setPlayerOneHand((current) => {
        const currentHand = [...current];
        const selectedIndex = currentHand.findIndex(
          (card) => card.code === cardToDiscard.code
        );
        currentHand.splice(selectedIndex, 1);
        return currentHand;
      });
      setGlobalDeck((current) => {
        return [...current, cardToDiscard];
      });
    });

    socket.on("playerOneTileDiscard", (tileIndex, opposingCard) => {
      setPlayerOneTriangle((prev) => {
        const updatedTriangle = [...prev];
        console.log(updatedTriangle[tileIndex]);
        updatedTriangle[tileIndex] = false;
        return updatedTriangle;
      });
      setGlobalDeck((current) => {
        return [...current, opposingCard];
      });
    });

    socket.on("playerTwoTileDiscard", (tileIndex, opposingCard) => {
      setPlayerTwoTriangle((prev) => {
        const updatedTriangle = [...prev];
        console.log(updatedTriangle[tileIndex]);
        updatedTriangle[tileIndex] = false;
        return updatedTriangle;
      });
      setGlobalDeck((current) => {
        return [...current, opposingCard];
      });
    });

    socket.on("gameWon", (user) => {
      setGameOver({
        isOver: true,
        winner: user,
      });
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
      socket.off("drawFromPile");
      socket.off("playerTwoDiscard");
      socket.off("playerOneDiscard");
      socket.off("playerOneTileDiscard");
      socket.off("playerTwoTileDiscard");
      socket.off("opposingCardHighlight");
      socket.off("gameWon");
    };
  }, []);

  return (
    <roomIdContext.Provider value={{ roomId, setRoomId }}>
      <gameOverContext.Provider value={{ gameOver, setGameOver }}>
        <opposingCardContext.Provider value={{ opposingCard, setOpposingCard }}>
          <playerOneRowsCheckContext.Provider
            value={{ playerOneRowsCheck, setPlayerOneRowsCheck }}
          >
            <gamePrepLoadingContext.Provider
              value={{ gamePrepLoading, setGamePrepLoading }}
            >
              <globalDeckContext.Provider value={{ globalDeck, setGlobalDeck }}>
                <cardInBattleContext.Provider
                  value={{ cardInBattle, setCardInBattle }}
                >
                  <currentTurnContext.Provider
                    value={{ currentTurn, setCurrentTurn }}
                  >
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
                                      <h2 style={{ fontSize: 20 }}>
                                        {thisUser === "playerOne"
                                          ? `player one: ${currentUsers[0]}`
                                          : `player two: ${currentUsers[1]}`}
                                      </h2>
                                      {isConnected ? (
                                        <PreLobby
                                          socket={socket}
                                          isPlayingGame={isPlayingGame}
                                        />
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
          </playerOneRowsCheckContext.Provider>
        </opposingCardContext.Provider>
      </gameOverContext.Provider>
    </roomIdContext.Provider>
  );
}

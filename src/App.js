import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { Home } from "./components/Home";
import { playerOneHandContext } from "./contexts/playerOneHand";
import { playerTwoHandContext } from "./contexts/playerTwoHand";
import { thisUserContext } from "./contexts/thisUser";
import { currentUsersContext } from "./contexts/currentUsers";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [playerOneHand, setPlayerOneHand] = useState([]);
  const [playerTwoHand, setPlayerTwoHand] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [thisUser, setThisUser] = useState("");
  const [userCount, setUserCount] = useState(0);

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

    socket.on("drawCards", (cards, player) => {
      if (player === "playerOne") {
        setPlayerOneHand((current) => [...current, ...cards]);
      } else {
        setPlayerTwoHand((current) => [...current, ...cards]);
      }
    });

    socket.on("modifyHand", (newHand, player) => {
      if (player === "playerOne") {
        setPlayerOneHand(newHand);
      } else {
        setPlayerTwoHand(newHand);
      }
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("addUserToLobby");
      socket.off("connectedUsers");
      socket.off("isPlayingGame");
      socket.off("drawCards");
      socket.off("assignPlayer");
    };
  }, []);

  return (
    <currentUsersContext.Provider value={{ currentUsers, setCurrentUsers }}>
      <playerOneHandContext.Provider
        value={{ playerOneHand, setPlayerOneHand }}
      >
        <playerTwoHandContext.Provider
          value={{ playerTwoHand, setPlayerTwoHand }}
        >
          <thisUserContext.Provider value={{ thisUser, setThisUser }}>
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
  );
}

import { createRef, useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { currentUsersContext } from "../contexts/currentUsers";
import { GamePrep } from "./GamePrep";
import { roomIdContext } from "../contexts/roomId";
import { Link } from "react-router-dom";
import { thisUserContext } from "../contexts/thisUser";
import { nicknameContext } from "../contexts/nickname";

export const Lobby = ({ isPlayingGame }) => {
  const { currentUsers, setCurrentUsers } = useContext(currentUsersContext);
  const { roomId } = useContext(roomIdContext);
  const { setThisUser } = useContext(thisUserContext);
  const { nickname } = useContext(nicknameContext);
  const [readyMsg, setReadyMsg] = useState("");
  const [readyPressed, setReadyPressed] = useState(false);

  useEffect(() => {}, []);

  const startGame = () => {
    if (currentUsers[0] === nickname) {
      setThisUser("playerOne");
    } else {
      setThisUser("playerTwo");
    }
    socket.emit("lobbyReady", roomId);
    setReadyPressed(true);
    setReadyMsg("waiting for other player...");
    // socket.emit("isPlayingGame", roomId);
  };

  return (
    <section>
      {!isPlayingGame ? (
        <section>
          <section className="navbar">
            <button>
              <Link to="/">home</Link>
            </button>
            <button>
              <Link to="/rules">rules</Link>
            </button>
            <button>
              <Link to="/about">about</Link>
            </button>
          </section>
          <section className="lobby-container">
            <section>
              <h2>Lobby</h2>
            </section>
            <section className="lobby-users-list">
              {currentUsers.map((user) => {
                return (
                  <section
                    key={user}
                    style={{
                      backgroundColor: "lightgreen",
                      padding: "0px 20px 0px 20px",
                      marginBottom: "5px",
                      borderRadius: "5px",
                      fontSize: "20px",
                    }}
                  >
                    <h5>{user}</h5>
                  </section>
                );
              })}
            </section>
            <button
              onClick={() => {
                if (currentUsers.length > 1) {
                  startGame();
                } else {
                  setReadyMsg("need two players to start the game");
                }
              }}
              style={{ marginBottom: "25px" }}
              disabled={readyPressed}
            >
              Ready
            </button>
            <h5> {readyMsg}</h5>
          </section>
        </section>
      ) : (
        <section>
          <GamePrep />
        </section>
      )}
    </section>
  );
};

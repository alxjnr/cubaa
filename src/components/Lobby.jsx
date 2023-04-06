import { useContext, useEffect, useState } from "react";
import { Game } from "./Game";
import { socket } from "../socket";
import { currentUsersContext } from "../contexts/currentUsers";

export const Lobby = ({ isPlayingGame }) => {
  const { currentUsers, setCurrentUsers } = useContext(currentUsersContext);

  useEffect(() => {}, []);

  const startGame = () => {
    socket.emit("isPlayingGame");
  };

  return (
    <section>
      {!isPlayingGame ? (
        <section className="lobby-container">
          <section>
            <h2>lobby</h2>
          </section>
          <section className="lobby-users-list">
            {currentUsers.map((user) => {
              return (
                <section
                  key={user}
                  style={{
                    backgroundColor: "lightgreen",
                    padding: 1,
                    marginBottom: "5px",
                  }}
                >
                  <h5>{user}</h5>
                </section>
              );
            })}
          </section>
          <button onClick={startGame}>start</button>
        </section>
      ) : (
        <Game />
      )}
    </section>
  );
};

import { useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { currentUsersContext } from "../contexts/currentUsers";
import { GamePrep } from "./GamePrep";
import { roomIdContext } from "../contexts/roomId";

export const Lobby = ({ isPlayingGame }) => {
  const { currentUsers, setCurrentUsers } = useContext(currentUsersContext);
  const { roomId } = useContext(roomIdContext);

  useEffect(() => {}, []);

  const startGame = () => {
    socket.emit("isPlayingGame", roomId);
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
        <section>
          <GamePrep />
        </section>
      )}
    </section>
  );
};

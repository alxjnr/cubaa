import { useState, useContext, useEffect } from "react";
import { Lobby } from "./Lobby";
import { socket } from "../socket";
import { currentUsersContext } from "../contexts/currentUsers";
import { thisUserContext } from "../contexts/thisUser";
import { useLocation, useParams } from "react-router-dom";
import { roomIdContext } from "../contexts/roomId";

export const PreLobby = ({ isPlayingGame, setIsPlayingGame, socket }) => {
  const { currentUsers } = useContext(currentUsersContext);
  const { thisUser, setThisUser } = useContext(thisUserContext);
  const { roomId, setRoomId } = useContext(roomIdContext);

  const [input, setInput] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const { room_id } = useParams();

  useEffect(() => {
    setRoomId(room_id);
    socket.emit("createRoom", room_id);
  }, []);

  const handleSubmit = () => {
    socket.emit("addUserToLobby", input, roomId);
    setInput("");
    setSignedUp(true);

    if (!currentUsers.length) {
      setThisUser("playerOne");
    } else {
      setThisUser("playerTwo");
    }
  };

  return (
    <section className="home-container">
      {!signedUp ? (
        <section>
          <section className="nickname-form">
            <input
              placeholder="nickname..."
              onChange={(event) => {
                setInput(event.target.value);
              }}
            ></input>
            <button onClick={handleSubmit}>submit</button>
          </section>
          <p>{socket.id} connected</p>
        </section>
      ) : (
        <section>
          <Lobby
            isPlayingGame={isPlayingGame}
            setIsPlayingGame={setIsPlayingGame}
          />
        </section>
      )}
    </section>
  );
};

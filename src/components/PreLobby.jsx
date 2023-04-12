import { useState, useContext, useEffect } from "react";
import { Lobby } from "./Lobby";
import { socket } from "../socket";
import { currentUsersContext } from "../contexts/currentUsers";
import { thisUserContext } from "../contexts/thisUser";
import { useLocation, useParams } from "react-router-dom";
import { roomIdContext } from "../contexts/roomId";
import { Link } from "react-router-dom";
import { nicknameContext } from "../contexts/nickname";

export const PreLobby = ({ isPlayingGame, setIsPlayingGame, socket }) => {
  const { currentUsers } = useContext(currentUsersContext);
  const { thisUser, setThisUser } = useContext(thisUserContext);
  const { roomId, setRoomId } = useContext(roomIdContext);
  const { setNickname } = useContext(nicknameContext);
  const [copyMsg, setCopyMsg] = useState("");

  const [input, setInput] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const { room_id } = useParams();

  useEffect(() => {
    setRoomId(room_id);
    socket.emit("createRoom", room_id);
  }, []);

  const handleSubmit = () => {
    socket.emit("addUserToLobby", input, roomId);
    setNickname(input);
    setInput("");
    setSignedUp(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(room_id);
    setCopyMsg("id copied");
  };

  return (
    <section className="home-container">
      {!signedUp ? (
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
          <section className="nickname-form">
            <input
              style={{ textAlign: "center" }}
              placeholder="nickname..."
              onChange={(event) => {
                setInput(event.target.value);
              }}
            ></input>
            <button onClick={handleSubmit} disabled={!input}>
              enter lobby
            </button>
          </section>
          <section className="nickname-form">
            <input
              type="text"
              value={room_id}
              readOnly
              style={{ textAlign: "center", width: "45vw" }}
            />
            <button onClick={handleCopy}>Copy</button>
          </section>
          <section
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <h5>{copyMsg}</h5>
          </section>
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

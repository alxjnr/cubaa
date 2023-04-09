import { useState, useContext } from "react";
import { Lobby } from "./Lobby";
import { socket } from "../socket";
import { currentUsersContext } from "../contexts/currentUsers";
import { thisUserContext } from "../contexts/thisUser";

export const PreLobby = ({ isPlayingGame, setIsPlayingGame }) => {
  const { currentUsers } = useContext(currentUsersContext);
  const { thisUser, setThisUser } = useContext(thisUserContext);

  const [input, setInput] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const handleSubmit = () => {
    // const roomId = "12345";
    // const currentUrl = window.location.href;
    // const newUrl = `${currentUrl}?room=${roomId}`;
    // window.history.pushState({ path: newUrl }, "", newUrl);
    socket.emit("addUserToLobby", input);
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
        <section className="nickname-form">
          <input
            placeholder="nickname..."
            onChange={(event) => {
              setInput(event.target.value);
            }}
          ></input>
          <button onClick={handleSubmit}>submit</button>
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

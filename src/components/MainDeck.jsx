import { useContext } from "react";
import { globalDeckContext } from "../contexts/globalDeck";
import { socket } from "../socket";
import { thisUserContext } from "../contexts/thisUser";
import { currentTurnContext } from "../contexts/currentTurn";

export const MainDeck = () => {
  const { globalDeck } = useContext(globalDeckContext);
  const { thisUser } = useContext(thisUserContext);
  const { currentTurn } = useContext(currentTurnContext);

  const drawFromPile = (user, currentTurn) => {
    socket.emit("drawFromPile", user, currentTurn);
  };

  return (
    <section
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <section
        style={{
          border: "solid lightgrey 2px",
          borderRadius: 5,
          padding: "5px",
        }}
      >
        <img
          className="card-on-board"
          key="globalDeck"
          alt="deck of cards"
          src={"/images/back-of-card.png"}
          style={{ width: "50px" }}
          onClick={() => {
            drawFromPile(thisUser, currentTurn);
          }}
        />
      </section>
    </section>
  );
};

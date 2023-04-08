import { useContext } from "react";
import { globalDeckContext } from "../contexts/globalDeck";
import { socket } from "../socket";
import { thisUserContext } from "../contexts/thisUser";
import { currentTurnContext } from "../contexts/currentTurn";

export const MainDeck = () => {
  const { globalDeck } = useContext(globalDeckContext);
  const { thisUser } = useContext(thisUserContext);
  const { currentTurn } = useContext(currentTurnContext);

  const drawFromPile = (user) => {
    socket.emit("drawFromPile", user);
    socket.emit("turnSwitch", thisUser);
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
          width: "50px",
          height: "70px",
        }}
      >
        {globalDeck.length > 0 ? (
          <img
            className="card-on-board"
            key="globalDeck"
            alt="deck of cards"
            src={"/images/back-of-card.png"}
            style={{ width: "50px" }}
            onClick={() => {
              if (thisUser === currentTurn) {
                drawFromPile(thisUser);
              }
            }}
          />
        ) : (
          <section></section>
        )}
      </section>
    </section>
  );
};

import { useContext } from "react";
import { playerTwoTriangleContext } from "../contexts/playerTwoTriangle";
import { thisUserContext } from "../contexts/thisUser";

export const PlayerTwoBoardTriangle = () => {
  const { playerTwoTriangle } = useContext(playerTwoTriangleContext);
  const { thisUser } = useContext(thisUserContext);

  return (
    <section className="player-one-board">
      {thisUser === "playerTwo" ? (
        <section>
          <section className="player-one-board-one">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[0].code}
                alt={playerTwoTriangle[0].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[0].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[1].code}
                alt={playerTwoTriangle[1].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[1].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[2].code}
                alt={playerTwoTriangle[2].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[2].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[3].code}
                alt={playerTwoTriangle[3].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[3].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
          <section className="player-one-board-two">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[4].code}
                alt={playerTwoTriangle[4].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[4].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[5].code}
                alt={playerTwoTriangle[5].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[5].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[6].code}
                alt={playerTwoTriangle[6].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[6].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
          <section className="player-one-board-three">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[7].code}
                alt={playerTwoTriangle[7].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[7].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[8].code}
                alt={playerTwoTriangle[8].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[8].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
          <section className="player-one-board-four">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[9].code}
                alt={playerTwoTriangle[9].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[9].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
        </section>
      ) : (
        <section>
          <section className="player-one-board-four">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[9].code}
                alt={playerTwoTriangle[9].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[9].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
          <section className="player-one-board-three">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[7].code}
                alt={playerTwoTriangle[7].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[7].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[8].code}
                alt={playerTwoTriangle[8].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[8].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
          <section className="player-one-board-two">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[4].code}
                alt={playerTwoTriangle[4].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[4].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[5].code}
                alt={playerTwoTriangle[5].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[5].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[6].code}
                alt={playerTwoTriangle[6].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[6].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
          <section className="player-one-board-one">
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[0].code}
                alt={playerTwoTriangle[0].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[0].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[1].code}
                alt={playerTwoTriangle[1].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[1].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[2].code}
                alt={playerTwoTriangle[2].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[2].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
            <section className="player-one-square">
              <img
                className="card-on-board"
                key={playerTwoTriangle[3].code}
                alt={playerTwoTriangle[3].code}
                src={
                  thisUser === "playerTwo"
                    ? playerTwoTriangle[3].image
                    : "/images/back-of-card.png"
                }
                style={{ width: "50px" }}
              />
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

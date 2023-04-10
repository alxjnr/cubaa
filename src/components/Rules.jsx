import { Link } from "react-router-dom";

export const Rules = () => {
  return (
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
      <section style={{ display: "flex", justifyContent: "center" }}>
        <p
          style={{
            textAlign: "center",
            marginTop: "100px",
            border: `2px solid #517992`,
            padding: "25px",
            borderRadius: "5px",
            width: "70vw",
          }}
        >
          <strong>Setup</strong>
          <br></br>
          <br></br>
          Players are dealt 16 cards and begin by building their pyramid with 4
          cascading rows of cards. Players will not see eachothers cards until
          that card is attacked.
          <br></br>
          <br></br>
          <strong>Gameplay</strong>
          <br></br>
          <br></br>
          Once players have setup their cards, we enter the game. Players will
          take it in turns to first choose a card from their hand, and then
          select a card on the first row of the opposing players pyramid. If the
          attacking player has the higher value card or a card of the same
          value, they win the card from the opposing players tile and keep their
          attacking card. If they lose, the opposing player will take the
          attackers card and the overturned card on the pyramid will remain
          revealed to all players. This card can then be attacked again next
          round if the player chooses to do so. Players may also choose to spend
          their turn withdrawing two new cards from the deck.
          <br></br>
          <br></br>
          Players MUST clear each row in turn in order to proceed with the game.
          <br></br>
          <br></br>
          The first player to eliminate the single card on the last row of the
          opposing players pyramid, wins the game.
          <br></br>
          <br></br>
          <strong>Face Cards</strong>
          <br></br>
          <br></br>
          When a face card is played, it is placed into the discard pile. This
          means if a player uses a King to attack, win or lose, the King will go
          to the discard pile. If a player places a king on one of their pyramid
          tiles, the same rules apply. If that king is beaten, it goes to the
          discard pile and is not won by the opposing player.
          <br></br>
          <br></br>
          <strong>The Ace</strong>
          <br></br>
          <br></br>
          Aces can be beaten by other Aces, or a FACE CARD of the same SUIT.
        </p>
      </section>
    </section>
  );
};

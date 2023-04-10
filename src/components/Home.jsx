import { Link } from "react-router-dom";
export const Home = () => {
  const randomString = Math.random().toString(36).substring(2, 12);

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
      <section className="home-page">
        <button>
          <Link to={`/game/${randomString}`}>create game</Link>
        </button>
        <p
          style={{
            textAlign: "center",
            marginTop: "50px",
            border: `2px solid #517992`,
            padding: "25px",
            borderRadius: "5px",
          }}
        >
          Adamas is a free online card game for two players. Players take turns
          playing cards from their hands, trying to make their way up the
          opponent's pyramid. The goal is to reach the top and capture the
          opponent's last card.<br></br>
          <br></br>
          Click 'create game' to create a game, then copy the URL and send it to
          a friend to enter the lobby.
        </p>
      </section>
    </section>
  );
};
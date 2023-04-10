import { Link } from "react-router-dom";

export const About = () => {
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
        <p
          style={{
            textAlign: "center",
            marginTop: "50px",
            border: `2px solid #517992`,
            padding: "25px",
            borderRadius: "5px",
          }}
        >
          game created by{" "}
          <a style={{ color: "blue" }} href="https://github.com/alxjnr">
            alxjnr
          </a>
        </p>
      </section>
    </section>
  );
};

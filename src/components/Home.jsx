import { Link } from "react-router-dom";
export const Home = () => {
  const randomString = Math.random().toString(36).substring(2, 12);

  return (
    <section>
      <h2>test</h2>
      <Link to={`/game/${randomString}`}>play game</Link>
    </section>
  );
};

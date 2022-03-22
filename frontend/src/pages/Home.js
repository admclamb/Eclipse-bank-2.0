import MainCards from "../components/cards/MainCard";

const Home = (user) => {
  console.log(user);

  return (
    <main className="pt-4 bg-light container">
      <section className="charts"></section>
      <section className="cards">
        <h3>Cards</h3>
        <MainCards />
      </section>
    </main>
  );
};

export default Home;

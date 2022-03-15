import MainCards from "../components/cards/MainCard";

const Home = () => {
  return (
    <main className="pt-4 bg-light container">
      <section className="charts">
        <LineChart />
      </section>
      <section className="cards">
        <h3>Cards</h3>
        <MainCards />
      </section>
    </main>
  );
};

export default Home;

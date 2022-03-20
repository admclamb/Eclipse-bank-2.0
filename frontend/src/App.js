import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes";
import NotLoggedIn from "./pages/NotLoggedIn";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser({});
  }, []);

  console.log(Object.keys(user).length);
  if (Object.keys(user).length < 1) {
    return <NotLoggedIn />;
  }
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes />
      </main>
    </>
  );
}

export default App;

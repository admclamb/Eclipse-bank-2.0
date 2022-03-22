import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

const Routes = ({ user }) => {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Home user={user} />
      </Route>
    </Switch>
  );
};

export default Routes;

import { Switch, Route } from "react-router-dom";
import CreateBankAccount from "./components/createBankAccount/CreateBankAccount";
import Home from "./pages/Home";

const Routes = ({ user }) => {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Home user={user} />
      </Route>
      <Route exact={true} path="/createBankAccount">
        <CreateBankAccount user={user} />
      </Route>
    </Switch>
  );
};

export default Routes;

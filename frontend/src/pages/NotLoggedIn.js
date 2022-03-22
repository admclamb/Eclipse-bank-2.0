import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import LandingPage from "./LandingPage";

const NotLoggedIn = ({ user, setUser }) => {
  return (
    <Switch>
      <Route path="/login">
        <Login user={user} setUser={setUser} />
      </Route>
      <Route path="/signup">
        <Signup setUser={setUser} />
      </Route>
      <Route path="/">
        <LandingPage />
      </Route>
    </Switch>
  );
};

export default NotLoggedIn;

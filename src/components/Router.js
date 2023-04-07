import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import App from "./App";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <Router>
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile refreshUser={refreshUser} userObj={userObj} />
              </Route>
            </>
          ) : (
            <Route exact path="/">
              <Auth></Auth>
            </Route>
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default AppRouter;

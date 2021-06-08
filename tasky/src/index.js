import React, { Component } from "react";
import { Route, HashRouter as Router } from "react-router-dom";

import App from "./components/App";
import ReactDOM from "react-dom";

ReactDOM.render(
  <Router>
    <Route
      component={() => (
        <App />
      )}
    />
  </Router>,
  document.getElementById("root")
);

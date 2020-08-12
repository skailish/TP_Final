import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Container from "./components/primitive/Container"

import Movies from "./pages/Movies";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Aside />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movies">
            <Movies />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;

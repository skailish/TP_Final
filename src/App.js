import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Aside from "./components/Aside";
import Footer from "./components/Footer";

import Movies from "./pages/Movies";
import Home from "./pages/Home";
import TVSeries from "./pages/TVSeries";

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
          <Route exact path="/tv">
            <TVSeries />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;

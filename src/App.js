import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Container from "./components/primitive/Container";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import Categories from "./pages/categories/Categories";

function App() {
  return (
    <Container className="main-aside-container">
      <Router>
        <Aside />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movies">
            <Movies />
          </Route>
          <Route exact path="/:media/:category">
            <Categories />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </Container>
  );
}

export default App;

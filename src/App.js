import React from "react";
import Aside from "./components/Aside";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Container from "./components/primitive/Container"

function App() {
  return (
    <>
      <Router>
        <Aside />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;

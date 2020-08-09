import React from "react";
import Aside from "./components/Aside";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import { ImageProvider } from "./contexts/ImageContext";

function App() {
  return (
    <ImageProvider>
      <Router>
        <Aside />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ImageProvider>
  );
}

export default App;

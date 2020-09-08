import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import firebase from "configs/firebase";

import { Aside, Footer, Container, SearchBar } from "./components";

import {
  Movies,
  Home,
  TVSeries,
  Categories,
  TVShow,
  Trailer,
  Login,
  Signup,
  ErrorPage,
  Movie,
  Favs,
  Discover,
} from "./pages";

import UserContext from "./contexts/UserContext";
import FavsContext from "./contexts/FavsContext";

function App() {
  const { user, setUser } = useContext(UserContext);
  const { updateSeriesFavs, updateMovieFavs } = useContext(FavsContext);

  useEffect(() => {
    const unsuscribe = firebase
      .auth()

      .onAuthStateChanged((user) => {
        setUser(user);
      });

    return () => unsuscribe();
  }, []);

  useEffect(() => {
    updateSeriesFavs(user);
    updateMovieFavs(user);
  }, [user]);

  return (
    <Container className="main-aside-container">
      <Router>
        <Aside user={user} />

        <SearchBar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movie">
            <Movies />
          </Route>
          <Route exact path="/tv">
            <TVSeries />
          </Route>
          <Route exact path="/:media/category/:category">
            <Categories />
          </Route>
          <Route path="/tv/:TVId">
            <TVShow />
          </Route>
          <Route path="/movie/:movieId">
            <Movie />
          </Route>
          <Route exact path="/video/:media/:id">
            <Trailer />
          </Route>
          <Route exact path="/login">
            <Login user={user} />
          </Route>
          <Route exact path="/signup">
            <Signup user={user} />
          </Route>
          <Route exact path="/favs">
            {user ? <Favs user={user} /> : <Redirect to="" />}
          </Route>
          <Route exact path="/discover">
            <Discover />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </Container>
  );
}

export default App;

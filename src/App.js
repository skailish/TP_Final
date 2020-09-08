import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import firebase from "configs/firebase";

import {
  Aside,
  Footer,
  Container,
  SearchBar,
  NavGuest,
  NavAuth,
} from "./components";

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
        {user ? <NavAuth /> : <NavGuest />}

        <SearchBar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movie" component={Movies} />
          <Route exact path="/tv" component={TVSeries} />
          <Route
            exact
            path="/:media/category/:category"
            component={Categories}
          />
          <Route path="/tv/:TVId" component={TVShow} />
          <Route path="/movie/:movieId" component={Movie} />
          <Route exact path="/video/:media/:id" component={Trailer} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/favs" component={Favs} />
          <Route exact path="/discover" component={Discover} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
      <Footer />
    </Container>
  );
}

export default App;

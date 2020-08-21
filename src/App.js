import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import firebase from "configs/firebase";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Container from "./components/primitive/Container";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import TVSeries from "./pages/TVSeries";
import Categories from "./pages/categories/Categories";
import TVShow from "./pages/TVShow";
import Trailer from "./pages/Trailer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import UserContext from "./contexts/UserContext";
import Favs from "./pages/Favs";
import SearchBar from "./components/SearchBar";
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
        <SearchBar />
        <Aside user={user} />

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
          <Route path="/tv/:TVId">
            <TVShow />
          </Route>
          <Route exact path="/:media/category/:category">
            <Categories />
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

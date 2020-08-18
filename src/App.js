import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase, { db } from "configs/firebase";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Container from "./components/primitive/Container";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import TVSeries from "./pages/TVSeries";
import Categories from "./pages/categories/Categories";
import Trailer from "./pages/Trailer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import UserContext from "./contexts/UserContext";
import Favs from "./pages/Favs";
import FavsContext from "./contexts/FavsContext";

function App() {
  const { user, setUser } = useContext(UserContext);
  const { setFavsArray } = useContext(FavsContext);

  useEffect(() => {
    const unsuscribe = firebase
      .auth()

      .onAuthStateChanged((user) => {
        setUser(user);
      });

    return () => unsuscribe();
  }, []);

  useEffect(() => {
    db.collection("Favs")
      .doc(`${user.email}`)
      .collection("tv")
      .get()
      .then((response) => {
        const series = [];
        response.forEach((document) => {
          series.push(document.data().id);
        });
        setFavsArray(series);
        window.localStorage.setItem("favs", series);
        console.log(window.localStorage.getItem("favs"));
      });
  }, [user]);

  return (
    <Container className="main-aside-container">
      <Router>
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
            <Favs user={user} />
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

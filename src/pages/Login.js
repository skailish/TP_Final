import React, { useState, useContext } from "react";
import firebase from "../configs/firebase";
import { useHistory, Link, Redirect } from "react-router-dom";
import Container from "../components/primitive/Container";
import Input from "../components/primitive/Input";
import Label from "../components/primitive/Label";
import Heading from "../components/primitive/Heading";
import Button from "../components/primitive/Button";
import Text from "../components/primitive/Text";
import ThemeContext from "../contexts/ThemeContext";

const Login = ({ user }) => {
  const [error, setError] = useState(false);
  const history = useHistory();
  const { theme } = useContext(ThemeContext);

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    setError(false);
    firebase
      .auth()
      .signInWithEmailAndPassword(
        event.target.email.value,
        event.target.password.value
      )
      .then(() => history.push("/"))
      .catch((error) => setError(error.message));
  };

  return !user ? (
    <>
      <Container className={`form-container ${theme}`}>
        <Heading level={1} className={`form-heading ${theme}`}>
          Login
        </Heading>
        <Container id="auth-error">
          {error && <Text id="error-message">{error}</Text>}
        </Container>
        <Container
          as="form"
          action=""
          onSubmit={handleSubmit}
          className={`form ${theme}`}
        >
          <Label className={`form-label ${theme}`}>
            Email
            <Input
              type="email"
              name="email"
              className={`form-input ${theme}`}
            />
          </Label>
          <Label className={`form-label ${theme}`}>
            Password
            <Input
              type="password"
              name="password"
              className={`form-input ${theme}`}
            />
          </Label>
          <Button type="submit">Sign In</Button>
        </Container>
        <Text className={`form-text ${theme}`}>
          If you´re not registered, do it{" "}
          <Link to="/signup" className={`form-link ${theme}`}>
            {" "}
            here{" "}
          </Link>
        </Text>
      </Container>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default Login;

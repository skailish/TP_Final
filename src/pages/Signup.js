import React, { useState, useContext } from "react";
import firebase, { db } from "../configs/firebase";
import { useHistory, Redirect } from "react-router-dom";
import Container from "../components/primitive/Container";
import Input from "../components/primitive/Input";
import Label from "../components/primitive/Label";
import Heading from "../components/primitive/Heading";
import Button from "../components/primitive/Button";
import ThemeContext from "../contexts/ThemeContext";
import Text from "../components/primitive/Text";
import UserContext from "../contexts/UserContext";

const Signup = ({ user }) => {
  const [error, setError] = useState(false);
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false);
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        event.target.email.value,
        event.target.password.value
      )
      .then(() => setUser(event.target.email.value))
      .then(() => history.push("/"))
      .catch((error) => setError(error.message));
  };

  return !user ? (
    <>
      <Container className={`form-container ${theme}`}>
        <Heading level={1} className={`form-heading ${theme}`}>
          Sign Up
        </Heading>
        <Container id="auth-error">
          {error && <Text id="error-message">{error}</Text>}
        </Container>
        <Container
          as="form"
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
          <Button type="submit">Sign Up</Button>
        </Container>
      </Container>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default Signup;

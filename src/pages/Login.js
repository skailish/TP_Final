import React, { useState, useContext, useEffect, useRef } from "react";
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
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleEmailDown = (event) => {
    if (event.key === "Enter") {
      passRef.current.focus();
    }
  };

  const handlePassDown = (event) => {
    if (event.key === "Enter") {
      submitRef.current.focus();
    }
  };

  const handleSubmit = (event) => {
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
              forwardedRef={emailRef}
              onKeyDown={handleEmailDown}
              type="email"
              name="email"
              className={`form-input ${theme}`}
            />
          </Label>
          <Label className={`form-label ${theme}`}>
            Password
            <Input
              forwardedRef={passRef}
              onKeyDown={handlePassDown}
              type="password"
              name="password"
              className={`form-input ${theme}`}
            />
          </Label>
          <Button forwardedRef={submitRef} type="submit">
            Sign In
          </Button>
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

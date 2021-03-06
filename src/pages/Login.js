import React, { useState, useContext, useEffect, useRef } from "react";
import firebase from "../configs/firebase";
import { useHistory, Link, Redirect } from "react-router-dom";

import {
  Container,
  Input,
  Label,
  Heading,
  Button,
  Text,
  Modal,
} from "../components";

import ThemeContext from "../contexts/ThemeContext";
import UserContext from "../contexts/UserContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
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
      .then(() => setModal(true))
      .then(() => setTimeout(() => history.push("/"), 1000))
      .catch((error) => setError(error.message));
  };

  return (
    <>
      {modal && <Modal text="You have logged in successfully!" />}
      {(!user || (user && modal)) && (
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
      )}

      {user && !modal && <Redirect to="/" />}
    </>
  );
};

export default Login;

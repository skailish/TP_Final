import React, { useState, useContext, useEffect, useRef } from "react";
import firebase from "../configs/firebase";
import { useHistory, Redirect } from "react-router-dom";

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

const Signup = () => {
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
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
    event.persist();

    setError(false);
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        event.target.email.value,
        event.target.password.value
      )
      .then(() => setModal(true))
      .then(() => setUser(event.target.email.value))
      .then(() => setTimeout(() => history.push("/"), 1000))
      .catch((error) => setError(error.message));
  };

  return (
    <>
      {modal && <Modal text="Your new account has been created!" />}
      {(!user || (user && modal)) && (
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
                forwardedRef={emailRef}
                onKeyDown={handleEmailDown}
                type="email"
                name="email"
                ref={emailRef}
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
                ref={passRef}
                className={`form-input ${theme}`}
              />
            </Label>
            <Button ref={submitRef} type="submit">
              Sign Up
            </Button>
          </Container>
        </Container>
      )}
      {user && !modal && <Redirect to="/" />}
    </>
  );
};

export default Signup;

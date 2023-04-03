import React, { useState } from "react";
import AuthForm from "../components/authForm";
import { firebaseInstance } from "../firebase";
import styled from "styled-components";

const Auth = () => {
  const onSocialClick = (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name == "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name == "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    firebaseInstance.auth().signInWithPopup(provider);
  };

  return (
    <Container>
      <AuthForm />
      <SocialBox>
        <SocialBtn onClick={onSocialClick} name="google">
          LogIn with Google
        </SocialBtn>
        <SocialBtn onClick={onSocialClick} name="github">
          LogIn with Github
        </SocialBtn>
      </SocialBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: gray;
`;

const SocialBox = styled.div`
  margin-top: 20px;
`;

const SocialBtn = styled.button`
  padding: 5px 15px;
  border-radius: 15px;
  margin-left: 10px;
  background-color: black;
  color: white;
`;

export default Auth;

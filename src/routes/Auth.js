import React, { useState } from "react";
import AuthForm from "../components/authForm";
import { authService, firebaseInstance } from "../firebase";

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
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          LogIn with Google
        </button>
        <button onClick={onSocialClick} name="github">
          LogIn with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;

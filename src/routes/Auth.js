import React, { useState } from "react";
import { authService, firebaseInstance } from "../firebase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (event) => {
    //event.target => 이벤트가 일어나는 타겟(객체) 의미
    const {
      target: { name, value },
    } = event;
    if (name == "email") {
      setEmail(value);
    }
    if (name == "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

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
    const data = firebaseInstance.auth().signInWithPopup(provider);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create a new account" : "Log-In"}
        />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign-In" : "Create a new account"}
      </span>
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

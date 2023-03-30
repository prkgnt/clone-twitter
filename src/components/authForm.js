import React, { useState } from "react";
import { authService } from "../firebase";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  padding: 5px 15px;
  border-radius: 15px;
  border-color: white;
  margin-right: 5px;
`;
const SubmitBtn = styled.input`
  padding: 5px 15px;
  border-radius: 15px;
  border-color: black;
  margin-left: 5px;
`;
const ToggleBox = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 30px;
`;
const ToggleBtn = styled.button`
  position: absolute;
  left: 45%;
  width: 100px;
  height: 30px;
  padding: 5px 50px;
  border-radius: 15px;
  background-color: ${(props) => (props.newAccount ? "black" : "white")};
  border-color: black;
  border-width: 3px;
`;
const Circle = styled.div`
  position: absolute;
  left: 45%;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: black;
`;

const AuthForm = () => {
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
    } catch (error) {
      alert(error);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <SubmitBtn
          type="submit"
          value={newAccount ? "Create a new account" : "Log-In"}
        />
      </form>
      <ToggleBox>
        <ToggleBtn onClick={toggleAccount} newAccount={newAccount}>
          {newAccount ? "Sign-In" : "Create a new account"}
        </ToggleBtn>
        <Circle></Circle>
      </ToggleBox>
    </Container>
  );
};

export default AuthForm;

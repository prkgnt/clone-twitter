import React from "react";
import { authService } from "../firebase";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    //useHistory 훅을 이용하면 원하는 페이지로 이동 가능
    //또는 Redirect 사용하면 됨
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;

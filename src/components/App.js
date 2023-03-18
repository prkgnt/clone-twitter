import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase";

function App() {
  //authService.currentUser = 현재 로그인 정보 (기본값 null)
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    //userState가 바뀌었을 경우
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  //return {} => 이건 안됨
  //return <> {} </> => 이건 됨
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "lodaing..."
      )}
    </>
  );
}

export default App;

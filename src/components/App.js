import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase";

function App() {
  //authService.currentUser = 현재 로그인 정보 (기본값 null)
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  //return {} => 이건 안됨
  //return <> {} </> => 이건 됨
  return <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "lodaing..."}</>;
}

export default App;

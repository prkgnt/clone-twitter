import React, { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase";

function App() {
  //authService.currentUser = 현재 로그인 정보 (기본값 null)
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;

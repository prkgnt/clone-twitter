import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../firebase";

function App() {
  //authService.currentUser = 현재 로그인 정보 (기본값 null)
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    //userState가 바뀌었을 경우
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        // setUserObj({
        //   displayName: user.displayName,
        //   uid: user.uid,
        //   updateProfile: (args) => user.updateProfile(args),
        // });
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    // setUserObj({
    //   displayName: user.displayName,
    //   uid: user.uid,
    //   updateProfile: (args) => user.updateProfile(args),
    // });
    setUserObj(user);
    //안쓰는 스테이트 같이 업데이트 해서 렌더링 강제하기
    setName(user.displayName);
  };

  //return {} => 이건 안됨
  //return <> {} </> => 이건 됨
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "lodaing..."
      )}
    </>
  );
}

export default App;

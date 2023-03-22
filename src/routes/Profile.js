import React, { useEffect, useState } from "react";
import { authService, dbService } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const [name, setName] = useState("");
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    //useHistory 훅을 이용하면 원하는 페이지로 이동 가능
    //또는 Redirect 사용하면 됨
    history.push("/");
  };
  const getMyTweet = async () => {
    //db 데이터 필터링 하기
    //index가 필요하다고 오류나는 경우 오류 메세지 속 링크 클릭해서 쿼리 생성하기
    const myTweet = await dbService
      .collection("tweet")
      .where("userId", "==", userObj.uid)
      .orderBy("createAt", "desc")
      .get();
    //myTweet는 여러 오브젝트들이 담긴 배열임
    //맵으로 오브젝트를 하나씩 뽑아 데이터 추출
    console.log(myTweet.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyTweet();
    if (userObj.displayName) {
      setName(userObj.displayName);
    }
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName != name) {
      await userObj.updateProfile({
        displayName: name,
      });
      refreshUser();
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setName(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="DisplayName"
          value={name}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;

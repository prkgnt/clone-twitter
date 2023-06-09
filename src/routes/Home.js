import React, { useEffect, useState } from "react";
import Tweet from "../components/tweet";
import { dbService } from "../firebase";
import styled from "styled-components";
import TweetFactory from "../components/tweetFactory";

const Container = styled.div`
  padding-top: 30px;
  display: flex;
  height: 100vh;
  background-color: black;
  align-items: center;
  flex-direction: column;
`;
const TweetBox = styled.div`
  margin-top: 50px;
  width: 100vh;
  justify-content: center;
  align-items: center;
`;

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    //orderBy => 정렬, onSnapShot => 이벤트 리스너
    dbService
      .collection("tweet")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetArray);
      });
  }, []);

  return (
    <Container>
      <TweetFactory userObj={userObj} />
      <TweetBox>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.userId === userObj.uid}
          />
        ))}
      </TweetBox>
    </Container>
  );
};

export default Home;

// onsnapShot 대신 이렇게 써도 됨

// const getTweets = async () => {
//   //collection.get() 은 전체 데이터를 한번에 가져오는게 아니라 하나씩 가져옴
//   //그래서 forEach 써야됨
//   const dbTweets = await dbService.collection("tweet").get();

//   dbTweets.forEach((doc) => {
//     const tweetsObject = {
//       ...doc.data(),
//       id: doc.id,
//     };
//     setTweets((prev) => [tweetsObject, ...prev]);
//   });
// };

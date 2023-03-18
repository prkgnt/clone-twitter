import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    //collection.get() 은 전체 데이터를 한번에 가져오는게 아니라 하나씩 가져옴
    //그래서 forEach 써야됨
    const dbTweets = await dbService.collection("tweet").get();

    dbTweets.forEach((doc) => {
      const tweetsObject = {
        ...doc.data(),
        id: doc.id,
      };
      setTweets((prev) => [tweetsObject, ...prev]);
    });
  };

  useEffect(() => {
    //setTweets([]);
    //getTweets();

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

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweet").add({
      text: tweet,
      createAt: Date.now(),
      userId: userObj.uid,
    });
    setTweet("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { dbService } from "../firebase";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweet").add({
      tweet,
      createAt: Date.now(),
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
    </div>
  );
};
export default Home;

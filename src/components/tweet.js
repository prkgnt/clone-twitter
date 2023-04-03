import React, { useState } from "react";
import { dbService, storageService } from "../firebase";
import styled from "styled-components";

const Tweet = ({ tweetObj, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await dbService.doc(`tweet/${tweetObj.id}`).delete();
      //firestore는 레퍼런스를 받아와야 하므로 refFromURL 사용
      await storageService.refFromURL(tweetObj.attachmentURL).delete();
    }
  };

  const onEditClick = () => setIsEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweet/${tweetObj.id}`).update({
      text: newTweet,
    });
    setIsEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <Container>
      {isEditing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newTweet}
              placeholder="Edit your tweet"
              required
              onChange={onChange}
            />
            <input type="submit" value="Update"></input>
          </form>

          <button onClick={onEditClick}>Cancel</button>
        </>
      ) : (
        <TweetBox>
          <Text>{tweetObj.text}</Text>
          {tweetObj.attachmentURL && <Image src={tweetObj.attachmentURL} />}
          {isOwner && (
            <BtnBox>
              <Btn onClick={onDeleteClick}>Delete</Btn>
              <Btn onClick={onEditClick}>Edit</Btn>
            </BtnBox>
          )}
        </TweetBox>
      )}
    </Container>
  );
};

const BtnBox = styled.div`
  margin-top: 10px;
`;
const Btn = styled.button`
  background-color: bisque;
  border: 0px;
  margin: 5px 5px;
  border-radius: 5px;
`;
const Text = styled.div`
  color: white;
`;
const Image = styled.img`
  margin: 10px 10px;
  width: 150px;
  height: 150px;
  border-radius: 15px;
`;
const Container = styled.div`
  display: flex;
`;
const TweetBox = styled.div`
  width: 100vh;
  height: fit-content;
  border: 1px solid gray;
  padding: 10px 10px;
  margin: 5px 100px;
`;

export default Tweet;

import React, { useState } from "react";
import { dbService, storageService } from "../firebase";

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
    <div>
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
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentURL && (
            <img src={tweetObj.attachmentURL} width="100px" height="100px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={onEditClick}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;

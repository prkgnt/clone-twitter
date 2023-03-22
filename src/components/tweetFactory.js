import React, { useRef, useState } from "react";
import { dbService, storageService } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [stringFile, setStringFile] = useState("");
  const fileText = useRef();

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentURL = "";

    //uuid => 랜덤 아이디 생성
    if (stringFile != "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(stringFile, "data_url");
      attachmentURL = await response.ref.getDownloadURL();
    }

    const tweetObj = {
      text: tweet,
      createAt: Date.now(),
      userId: userObj.uid,
      attachmentURL,
    };
    await dbService.collection("tweet").add(tweetObj);
    setStringFile("");
    setTweet("");
    fileText.current.value = null;
  };
  const onFileChange = (event) => {
    //파일은 event.target.files 에 들어있음
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    //파일을 읽기 위해 FileReader API 사용
    const reader = new FileReader();
    //이미지를 브라우저에서 읽을 수 있는 문자열로 변환
    reader.readAsDataURL(theFile);
    //로드가 끝나면 호출되는 이벤트 리스너
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setStringFile(result);
    };
  };
  const onClearClick = () => {
    setStringFile(null);
    //curren.value = 현재값
    fileText.current.value = null;
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={tweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileText}
      />
      <input type="submit" value="tweet" />
      {stringFile && (
        <div>
          <img src={stringFile} width="50px" height="50px" />
          <button onClick={onClearClick}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;

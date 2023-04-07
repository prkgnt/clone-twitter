import React, { useRef, useState } from "react";
import { dbService, storageService } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

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
      userName: userObj.displayName,
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
      <TextInput
        value={tweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <FileInput for="input-file">upload</FileInput>
      <input
        style={{ display: "none" }}
        id="input-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileText}
      />
      <Submit type="submit" value="tweet" />
      {stringFile && (
        <div>
          <img src={stringFile} width="50px" height="50px" />
          <button onClick={onClearClick}>Clear</button>
        </div>
      )}
    </form>
  );
};

const TextInput = styled.input`
  padding: 0px 20px;
  width: 400px;
  height: 40px;
  border-radius: 30px;
`;
const FileInput = styled.label`
  background-color: white;
  font-size: 15px;
  padding: 3px 5px;
  border-radius: 7px;
  margin: 0px 5px;
`;
const Submit = styled.input`
  background-color: skyblue;
  padding: 3px 7px;
  border-radius: 7px;
`;

export default TweetFactory;

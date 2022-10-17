import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { StarBorderOutlined, InfoOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

function Chat() {
  const roomId = useSelector(selectRoomId);
  const chatRef = useRef(null);

  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelId={roomId}
            channelName={roomDetails?.data().name}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  background-color: #36393f;
  color: #dddedf;

  @media screen and (max-width: 600px) {
    position: absolute;
    flex: 1;
    width: 100vw;
    height: calc(100vh - 60px);
    z-index: 1;
  }

  ::-webkit-scrollbar {
    background-color: gray;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #36393f;
  }

  ::-webkit-scrollbar-thumb {
    background: #2f3136;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #b8babd;
  }
`;

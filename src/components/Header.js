import React from "react";
import styled from "styled-components";
import {
  HelpOutline,
  Search,
  Tag,
  Inbox,
  PeopleAlt,
  PushPin,
  NotificationsOff,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { selectRoomId } from "../features/appSlice";

function Header() {
  const [user] = useAuthState(auth);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  return (
    <HeaderLayout>
      <Spacer>Secret</Spacer>
      <HeaderContainer>
        {/* Nav */}
        <HeaderLeft>
          {roomId ? (
            roomDetails && (
              <div>
                <Tag fontSize="small" />
                {roomDetails?.data().name}
              </div>
            )
          ) : (
            <h3>
              <strong>Select a room!</strong>
            </h3>
          )}
        </HeaderLeft>

        {/* Right */}
        <HeaderRight>
          <Tag />
          <NotificationsOff />
          <PushPin />
          <PeopleAlt />

          <HeaderSearch>
            <input placeholder="Search the chat"></input>
            <Search />
          </HeaderSearch>
          <Inbox />
          <HelpOutline sx={{ "&:hover": { color: "blue" } }} />
        </HeaderRight>
      </HeaderContainer>
    </HeaderLayout>
  );
}

export default Header;

const HeaderLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0.7;
  height: 60px;
`;

const Spacer = styled.div`
  flex: 0.3;
  max-width: 260px;
  min-width: 100px;
`;

const HeaderSearch = styled.div`
  opacity: 1;
  border-radius: 6px;
  background-color: #161618;
  text-align: left;
  display: flex;
  padding: 0 10px;
  color: gray;
  border: 1px gray solid;
  justify-content: space-between;

  > input {
    background-color: transparent;
    border: none;
    text-align: left;
    outline: 0;
    color: white;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex: 0.7;
  flex-grow: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: #36393F;
  color: white;
  z-index: 1;
  border-bottom: 1px solid #2E3036;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  > div {
    display: flex;
    font-weight: 700;
    align-items: center;
    text-overflow: ellipsis;
  }

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const HeaderRight = styled.div`
  flex: 0.2;
  display: flex;
  align-items: flex-end;
  margin-right: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    padding-left: 5px;
    padding-right: 5px;
    color: #B8BABD;

    &:hover {
      color: whitesmoke;
    }
  }
`;

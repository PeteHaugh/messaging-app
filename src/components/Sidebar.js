import React, { useState } from "react";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  ExpandMore,
  Add,
  Beenhere,
  Campaign,
  CellTower,
  FiberManualRecord,
  Settings,
  NavigateBefore,
  NavigateNext
} from "@mui/icons-material";
import { Avatar } from "@mui/material";

function Sidebar() {
  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);

  const [open, setOpen] = useState(true);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <SidebarContainer open={open}>
      <TabOpen>
        {!open ? (
          <NavigateNext onClick={() => toggle()} />
        ) : (
          <NavigateBefore onClick={() => toggle()} />
        )}
      </TabOpen>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Pete's Chatroom.</h2>
          <h3>
            <FiberManualRecord />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <ExpandMore />
      </SidebarHeader>

      <SidebarOption Icon={Beenhere} title="Welcome and Rules" />
      <SidebarOption Icon={Campaign} title="Annoucements" />
      <SidebarOption Icon={CellTower} title="Community Updates" />

      <hr />
      <SidebarOption Icon={ExpandMore} title="Text Channels" />

      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}

      <SidebarOption Icon={Add} addChannelOption title="Add channel" />
      <UserStatus>
        <div>
          <HeaderAvatar
            className="Avatar"
            onClick={() => auth.signOut()}
            src={user?.photoURL}
            alt={user?.displayName}
          />
          {user?.displayName}
        </div>
        <Settings />
      </UserStatus>
    </SidebarContainer>
  );
}

export default Sidebar;

const TabOpen = styled.div`
  @media screen and (max-width: 600px) {
    position: absolute;
    top: 40%;
    left: 140px;
    background-color: #2f3136;
    border-radius: 25%;
    display: flex;
    padding-left: 10px;
    height: 50px;
    align-items: center;
    z-index: 3;
  }
  display: none;
`;

const SidebarContainer = styled.div`
  background-color: #2f3136;
  color: white;
  flex: 0.3;
  max-width: 260px;
  margin-top: -60px;
  max-height: 100vh;
  position: relative;
  min-width: 150px;
  z-index: 999;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #26282c;
  }

  @media screen and (max-width: 1024px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
    margin-top: 0;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #26282c;

  padding: 13px;
  padding-bottom: 0;
  padding-top: 0;
  min-height: 60px;
  align-items: center;
  max-height: 60px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #b8babd;
    font-size: 32px;
  }

  @media screen and (max-width: 1024px) {
    > .MuiSvgIcon-root {
      font-size: 24px;
    }
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  position: relative;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: 60px;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }

  @media screen and (max-width: 1024px) {
    > h3 > .MuiSvgIcon-root {
      font-size: 7px;
    }

    > h2 {
      font-size: 0.8rem;
    }

    > h3 {
      font-size: 0.8rem;
    }
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const UserStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
  max-width: 260px;
  justify-content: space-between;

  > .MuiSvgIcon-root {
    margin-right: 10px;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  > div > .Avatar {
    margin-right: 5px;
    margin-left: 10px;
  }
`;

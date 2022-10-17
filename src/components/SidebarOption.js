import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { db } from "../firebase";
import { enterRoom } from "../features/appSlice";
import { Tag } from "@mui/icons-material";

function SidebarOption({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();

  const addChannel = () => {
    const channelName = prompt("Please enter channel name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>
            <Tag fontSize="small" />
          </span>{" "}
          {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  padding-right: 10px;

  :hover {
    opacity: 0.9;
    background-color: #161618;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding-right: 5px;
    padding-left: 30px;
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

const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

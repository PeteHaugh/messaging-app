import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

function AppLayout() {
  return (
    <>
      <Header />
      <AppBody>
        <Sidebar />
        <Outlet />
      </AppBody>
    </>
  );
}

export default AppLayout;

const AppBody = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

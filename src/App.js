import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Chat from "./components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import styled from "styled-components";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="https://i.ibb.co/VwBSTsQ/discord.png" alt="" />

          <Spinner name="cube-grid" color="#202225" fadeIn="none" size/>
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className="app">
      <Routes>
        {!user ? (
          <Route path="/" exact element={<Login />}></Route>
        ) : (
          <Route element={<AppLayout />}>
            <Route path="/" exact element={<Chat />}></Route>
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
  background-color: #36393f;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2f3136;
  border-radius: 10%;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }

  .sk-cube-grid {
    width: 50px;
    height: 50px;
}
`;

import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = (e) => {
    if (e.defaultPrevented) return; // Exits here if event has been handled
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://i.ibb.co/VwBSTsQ/discord.png"
          alt=""
        />
        <h1>Sign in to Discord</h1>
        <p>pete.discord.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: #36393f;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 10vw;
  text-align: center;
  background: #2f3136;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: white;

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit;
    background-color: #42464D;
    color: white;
    padding: 10px;
  }

  > button:hover { 
    background-color: #202225;
  }
`;

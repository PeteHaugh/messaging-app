import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Chat from "./components/Chat"

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/" exact element={<Chat/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;


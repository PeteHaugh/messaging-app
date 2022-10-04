import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="app">
      <Routes>
        <>
        <Route index element={<Header />} />
          
          <Route path="/" element={<></>}></Route>
        </>
      </Routes>
    </div>
  );
}

export default App;

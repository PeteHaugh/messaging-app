import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/" exact element={<></>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;


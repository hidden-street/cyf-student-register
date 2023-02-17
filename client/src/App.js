import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "./index.css";

function App() {
  return (
    <main className="App">
      <img src="/img/images.jpg" alt="cyf logo" className="img" />
      <Register />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;

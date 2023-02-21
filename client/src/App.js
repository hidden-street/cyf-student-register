import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "./index.css";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleShowLogin = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  return (
    <main className="App">
      <img src="/img/images.jpg" alt="cyf logo" className="img" />
      {showLogin ? <Login /> : <Register />}
      <button onClick={handleShowLogin}>
        {showLogin ? "Show Register" : "Show Login"}
      </button>
    </main>
  );
}

export default App;

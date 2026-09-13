import React, { useState } from "react";
import { LoginSignup } from "./components/LoginSignup/LoginSignup";
import { CrudAnime } from "./components/Crud/CrudAnime";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: isLoggedIn ? "#f8f9fa" : "transparent",
      }}
    >
      {isLoggedIn ? (
        <CrudAnime onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <LoginSignup onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;

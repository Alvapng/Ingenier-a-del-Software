import React, { useState } from "react";
import Login from "./Login";
import Logout from "./Logout";

const Sesion = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? <Logout /> : <Login />}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Cerrar Sesión" : "Iniciar Sesión"}
      </button>
    </div>
  );
};

export default Sesion;

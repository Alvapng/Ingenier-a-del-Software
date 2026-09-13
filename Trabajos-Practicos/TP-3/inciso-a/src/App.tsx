import { useState } from "react";
import "./App.css";
import { Rutas } from "./routing/rutas";

function App() {
  return (
    <div className="Layout">
      <h1>Blog con React</h1>
      <Rutas />
    </div>
  );
}

export default App;

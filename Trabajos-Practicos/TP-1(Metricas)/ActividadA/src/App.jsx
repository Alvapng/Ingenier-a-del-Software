import React from "react";
import Props from "./components/Props";
import Contador from "./components/Contador";
import InputTexto from "./components/InputTexto";
import Formulario from "./components/Formulario";
import MensajeCondicional from "./components/MensajeCondicional";
import Sesion from "./components/Sesion";
import ContadorEfecto from "./components/ContadorEfecto";
import ConsumoApi from "./components/ConsumoApi";

function App() {
  const nombre = "Juan";
  const apellidos = "Pérez";

  return (
    <div>
      <h1>Prácticas de React</h1>

      <Props nombre={nombre} apellidos={apellidos} />
      <hr />

      <Contador />
      <hr />

      <InputTexto />
      <hr />

      <Formulario />
      <hr />

      <MensajeCondicional />
      <hr />

      <Sesion />
      <hr />

      <ContadorEfecto />
      <hr />

      <ConsumoApi />
    </div>
  );
}

export default App;

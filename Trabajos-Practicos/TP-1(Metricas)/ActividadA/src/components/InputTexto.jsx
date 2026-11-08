import React, { useState } from "react";

const InputTexto = () => {
  const [texto, setTexto] = useState("");

  const manejarCambio = (evento) => {
    setTexto(evento.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Escribe algo"
        value={texto}
        onChange={manejarCambio}
      />
      <p>Has escrito: {texto}</p>
    </div>
  );
};

export default InputTexto;

import React, { useState, useEffect } from "react";

const ContadorEfecto = () => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log(`El contador es: ${contador}`);
  }, [contador]);

  return (
    <div>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
};

export default ContadorEfecto;

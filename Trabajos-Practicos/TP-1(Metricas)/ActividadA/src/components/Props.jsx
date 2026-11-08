import React from "react";

const Props = ({ nombre, apellidos }) => {
  return (
    <div>
      <h2>
        Hola {nombre} {apellidos}
      </h2>
    </div>
  );
};

export default Props;

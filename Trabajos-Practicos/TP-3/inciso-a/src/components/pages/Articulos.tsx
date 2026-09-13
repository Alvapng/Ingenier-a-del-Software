import React from "react";

export const Articulos = () => {
  return (
    <>
      <article className="articulo-item">
        <div className="mascara">
          <img src="https://es.wikipedia.org/wiki/JavaScript"></img>
        </div>
        <div className="datos">
          <h3 className="title">Desarrollo Web</h3>
          <p className="description">victorroblesweb.es</p>

          <button className="edit">Editar</button>
          <button className="delete">Borarr</button>
        </div>
      </article>

      <article className="articulo-item">
        <h3 className="title">Desarrollo web</h3>
        <p className="description">victorroblrsweb.es</p>

        <button className="edit">Editar</button>
        <button className="delete">Borrar</button>
      </article>

      <article className="articulo-item">
        <h3 className="title">Desarrollo web</h3>
        <p className="description">victorroblrsweb.es</p>

        <button className="edit">Editar</button>
        <button className="delete">Borrar</button>
      </article>

      <article className="articulo-item">
        <h3 className="title">Desarrollo web</h3>
        <p className="description">victorroblrsweb.es</p>

        <button className="edit">Editar</button>
        <button className="delete">Borrar</button>
      </article>
    </>
  );
};

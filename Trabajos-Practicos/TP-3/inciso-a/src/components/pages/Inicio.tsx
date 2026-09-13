import React from "react";
import {Link} from "react-router-dom";

export const Inicio = () => {
  return <div className="jumbo">
    <h1>Bienvenido al blog con React</h1>
    <p>Blog desarroladeo con el Mern Stack (Mongo, Express, React y NodeJs)</p>
    <Link to="/articulos" className="button">Ver los Articulos</link>
  </div>;
};
                                  
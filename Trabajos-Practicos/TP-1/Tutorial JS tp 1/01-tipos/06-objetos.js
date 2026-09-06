let nombre = "John Rambo";
let pelicula = "Rambo";
let edad = 33;

let personaje ={
    nombre: "John Rambo",
    pelicula: "Rambo",
    edad: 33,
};
console.log(personaje);
console.log(personaje.edad);
console.log(personaje.nombre);
console.log(personaje["pelicula"]);

personaje.edad = 34;

console.log(personaje["edad"]);

delete personaje.pelicula;
console.log(personaje.pelicula) 
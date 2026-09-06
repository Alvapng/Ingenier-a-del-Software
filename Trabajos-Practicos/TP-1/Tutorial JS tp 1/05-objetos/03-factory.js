

function crearUsuario(id,name,mail){
    return{
        id,
        name,
        mail,
        activo: true,
        recuperarClave: function(){
            console.log("Recuperando Clave...")
        }
    }
}

let user1 = crearUsuario(1,"Alvaro","nogueraalvaro33@gmail.com")
let user2 = crearUsuario(2,"carlos","carlos33@gmail.com")

console.log(user1)
console.log(user2)
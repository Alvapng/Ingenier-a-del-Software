const user = {id: 1,};

user.name = "Nicolas";
user.guardar = function(){
    console.log("Guardando: ", user.name);
}

user.guardar();
console.log(user);

delete user.name;
delete user.guardar;

console.log(user);

//const user2 = Object.freeze({id:1})
const user2 = Object.seal({id:1})
user2.name = "Nico";
user2.id = 2;
console.log(user2);
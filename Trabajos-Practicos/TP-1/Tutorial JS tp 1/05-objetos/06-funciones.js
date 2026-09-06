function Usuario(name){
    this.name = name;
}

console.log(Usuario.name)
console.log(Usuario.length)

const U = Usuario
let user = new U("Nicolas");
console.log(user);
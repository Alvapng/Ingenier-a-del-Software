let user = {
    id: 1,
    name: "Francisco",
    age: 25
};

for(let prop in user){
    console.log(prop, ": ",user[prop]);
}
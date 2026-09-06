function cantidadPositivos(arr){
    let contador = 0
    for(let element of arr){
        if(element > 0){
            contador = contador + 1;
        }
    }
    return contador;
}

let array = [2,5,7,15,-5,-100,55];

cantidad = cantidadPositivos(array);
console.log(cantidad);
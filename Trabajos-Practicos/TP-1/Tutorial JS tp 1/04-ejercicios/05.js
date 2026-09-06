function getMenorMayor(arr){
    let menor = arr[0];
    let mayor = arr[1];

    for(let element of arr){
        if(element > mayor){
            mayor = element;
        }else if(element < menor){
            menor = element;
        }
    }
    return [menor,mayor]

}

let array = [2,5,7,15,-5,-100,55];

numeros = getMenorMayor(array);
console.log(numeros);
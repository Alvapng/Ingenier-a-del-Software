function getbyIdx(arr, idx){
    if(idx >= arr.length || idx < 0){
        return "Posición invalida"
    }else{
        return arr[idx];
    }
}

let resultado = getbyIdx([1,2],2);
console.log(resultado);
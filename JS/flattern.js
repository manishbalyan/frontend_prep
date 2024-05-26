function flattern(arr){
    let result = [];
    for(let i=0; i<arr.length;i++){
        let val = arr[i];
        if(Array.isArray(val)){
            result = result.concat(flattern(val));
        }
        else{
            result.push(val);
        }
    }
    return result;
}

const nestedArray = [1, [2, [3, [4, [5]]]], 6];
const flatArray = flattern(nestedArray);

console.log(flatArray);
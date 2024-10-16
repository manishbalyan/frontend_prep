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


function deepFlatten(input){
    let result = [];
    function flattern(item){
        if(item !== null && Array.isArray(item)){
            for(let subItem of item){
                flattern(subItem);
            }
        }
        else if(item !== null && typeof item ==='object' && !item[Symbol.iterator]){
            for(let key in item){
                if(item.hasOwnProperty(key)){
                flattern(item[key]);
                }
            } 
        }
        else if(item !== null && typeof item ==='object' && item[Symbol.iterator]){
            for(let subItem of item){
                flattern(subItem);
            }
        }
        else {
            result.push(item);
        }
    }

    flattern(input);
    return result;
}


const nestedStructure = [
    1,
    { a: 2, b: [3, { c: 4, d: [5, 6] }] },
    7,
    [[8, 9], 10],
    new Set([11, 12, [13, 14], { e: 15, f: [16, 17] }]),
    new Map([[18, 19], [20, [21, 22]]]),
  ];
  
  const flatArrayVal = deepFlatten(nestedStructure);
  
  console.log(flatArrayVal);


  function flattenObject(obj, parentKey = '', result = {}) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                flattenObject(obj[key], newKey, result);
            } else if (Array.isArray(obj[key])) {
                obj[key].forEach((item, index) => {
                    if (typeof item === 'object' && item !== null) {
                        flattenObject(item, `${newKey}.${index}`, result);
                    } else {
                        result[`${newKey}.${index}`] = item;
                    }
                });
            } else {
                result[newKey] = obj[key];
            }
        }
    }
    return result;
}

const obj = {
    a: { b: 'c' },
    d: [{ e: 'f' }, 3],
};

const result = flattenObject(obj);
console.log(result);

// result = { 'a.b': 'c', 'd.0.e': 'f', 'd.1': 3 };
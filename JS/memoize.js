function memoize(fn,context){
    let cache = {};
    return function(...args){
        const argsCache = JSON.stringify(args);
        if(!cache[argsCache]){
            cache[argsCache] = fn.call(context||this,...args);
        }
        return cache[argsCache];
    }

}

const bigProduct = (num1,num2) => {
    for(let i = 1; i<10000000;i++){
    }
    return num1*num2;
}

const memoizedBigProduct = memoize(bigProduct);

console.time("first");
console.log(memoizedBigProduct(2,4))
console.timeEnd('first');
console.time('second');
console.log(memoizedBigProduct(2,4))
console.timeEnd('second');
function curry(fn) {
    return function curried(...args) {
      if (args.length >= fn.length) {
        return fn.apply(this, args);
      } else {
        return function(...nextArgs) {
          return curried.apply(this, args.concat(nextArgs));
        };
      }
    };
}

const _ = Symbol('placeholder');

function curryWithPlaceholder(fn) {
    return function curried(...args){
        const complete = args.length >= fn.length && !args.includes(_);
        if(complete){
            return fn.apply(this,args);
        }
        else{
            return function(...nextArgs){
                const newArgs = args.map((arg)=>arg === _ && nextArgs.length ? nextArgs.shift() : arg).concat(nextArgs);
                return curried.apply(this, newArgs);
            }
        }
    }

}

function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); 
console.log(curriedAdd(1, 2)(3)); 
console.log(curriedAdd(1)(2, 3)); 
console.log(curriedAdd(1, 2, 3)); 

function multiply(a, b, c, d) {
    return a * b * c * d;
}

const curriedMultiply = curryWithPlaceholder(multiply);

console.log(curriedMultiply(2)(3)(4)(5));           
console.log(curriedMultiply(2, _, 4)(3)(5));        
console.log(curriedMultiply(_, 3, _, 5)(2)(4));
console.log(curriedMultiply(_, 3, 4)(_)(2)(5)); 
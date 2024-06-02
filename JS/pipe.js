const pipe = (...fns) => (initialValue) => {
    if (fns.length === 0) return initialValue;
    return fns.reduce((acc, fn) => fn(acc), initialValue);
  };
  

const addition = (x) => x + 1;
const multiplication = (x) => x * 2;
const subtract = (x) => x - 3;

const pipedFunction = pipe(addition, multiply, subtract);

console.log(pipedFunction(5));
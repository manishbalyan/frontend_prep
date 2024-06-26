function promiseAll(promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            reject(new TypeError('arguments must be an array'));
        }
        let result = [];
        let resolvedpromise = 0;
        let promiseLength = promises.length;
        if(promiseLength===0){
            resolve(result);
        }
        promises.forEach((promise,index) => {
            Promise.resolve(promise).then((value)=>{
                result[index] = value;
                resolvedpromise++;
                if(resolvedpromise===promiseLength){
                    resolve(result);
                }
            }).catch((error)=>{
                reject(error);
            })
        });
    })
}

const promise1 = Promise.resolve(3);
const promise2 = 12;
const promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('done');
    },100)
})

promiseAll([promise1,promise2,promise3]).then((values)=>{
    console.log(values);
}).catch((error)=>{
    console.error(error)
});


function promiseAllSetteled(promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            reject(new TypeError('arguments must be an array'));
        }
        let result = [];
        let setteledPromise = 0;
        let promiseLength = promises.length;
        if(promiseLength===0){
            resolve(result);
        }
        promises.forEach((promise,index) => {
            Promise.resolve(promise).then((value)=>{
                result[index] = {status: 'fulfilled', value}
            }).catch((error)=>{
                result[index] = {status: 'rejected', error}
            }).finally(()=>{
                setteledPromise++;
                if(setteledPromise===promise.length){
                    resolve(result);
                }
            })
        });
    })
}

const promise4 = Promise.resolve(3);
const promise5 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promise6 = 42;

Promise.allSettled([promise4, promise5, promise6]).then(results => {
  console.log(results);
});



function promiseAny(promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            reject(new TypeError('arguments must be an array'));
        }
        let errors = [];
        let rejectCount = 0;
        let promiseLength = promises.length;
        if(promiseLength===0){
            reject(new AggregateError([],'All promises rejected'))
        }
        promises.forEach((promise,index) => {
            Promise.resolve(promise).then((value)=>{
                resolve(value);
            }).catch((error)=>{
                errors[index] = error;
                rejectCount++;
                if(rejectCount === promiseLength){
                    reject(new AggregateError(errors, "All Promises Rejected"));
                }
            })
        });
    })
}

const promise7 = Promise.reject('Error 1');
const promise8 = new Promise((resolve) => setTimeout(resolve, 100, 'Success 2'));
const promise9 = new Promise((resolve) => setTimeout(resolve, 200, 'Success 3'));

promiseAny([promise7,promise8,promise9]).then((value)=>{
    console.log('Resolved',value);
}).catch((error)=>{
    console.log('Errors:', error.errors)
})


function promiseRace(promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            reject(new TypeError('arguments must be an array'));
        }
        promises.forEach((promise)=>{
            Promise.resolve(promise).then((value)=>{
                resolve(value);
            }).catch((error)=>{
                reject(error);
            })
        })
        
    })
}


const promise10 = new Promise((resolve, reject) => setTimeout(resolve, 0, 'one'));
const promise11 = new Promise((resolve, reject) => setTimeout(resolve, 100, 'two'));
const promise12 = new Promise((resolve, reject) => setTimeout(reject, 200, 'three'));

promiseRace([promise10, promise11, promise12])
  .then((value) => {
    console.log('Resolved:', value); 
  })
  .catch((error) => {
    console.error('Rejected:', error);
  });




function promiseFinally(callback){
    if(typeof callback !== 'function'){
        return this.then(callback, callback);
    }
    return this.then(
        value => Promise.resolve(callback()).then(()=>value),
        reason => Promise.resolve.reject(callback()).then(()=> reason)
    )
}

const promise13 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Success'), 1000);
  });
  
  promise13
    .then(value => {
      console.log('Resolved:', value);
    })
    .catch(error => {
      console.error('Rejected:', error);
    })
    .finally(() => {
      console.log('Finally called');
    });
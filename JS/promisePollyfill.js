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
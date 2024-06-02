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
})
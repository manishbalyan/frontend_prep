function autoRetry(fn, retries,delay){
    return function(...args){
        return new Promise((resolve,reject)=>{
            const attempt = (n) => {
                fn(...args).then(resolve).catch((error)=>{
                    if(n===0){
                        reject(error);
                    }
                    else{
                        setTimeout(()=>{
                            attempt(n-1);
                        },delay)
                    }
                })
            }
            attempt(retries);
        });
    }
}

const fetchWithRetry = autoRetry(fetch, 3, 2000);

fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Failed after retries:', error));
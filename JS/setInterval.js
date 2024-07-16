function customSetInterval(callback,interval){
    let lastTime = Date.now();

    function check(){
        let current = Date.now();
        if(current-lastTime>=interval){
            lastTime = current;
            callback();
        }
        else{
            requestAnimationFrame(check);
        }
    }
    requestAnimationFrame(check);
}

console.log('now')

customSetInterval(()=>{
    console.log("custom interval triggered")
},2000)
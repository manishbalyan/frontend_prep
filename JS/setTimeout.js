function customSetTimeout(callback,delay){
    let start = Date.now();
    function check(){
        let current = Date.now();
        if(current-start >=delay){
            callback();
        }
        else{
            requestAnimationFrame(check);
        }
    }
    requestAnimationFrame(check);
}

console.log("now")

customSetTimeout(()=>{
    console.log("after 2sec")
},2000)
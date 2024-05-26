// forEach
Array.prototype.myForEach = function(callback){
    for(let i= 0; i<this.length; i++){
        if(i in this){
            callback.call(this[i],i,this);
        }
    }
}

let array = [1,2,3,4,5];
array.forEach((element,id,arrd)=>{
  console.log(`${element},${id}`,arrd)
})
function throttle(fn,delay){
    let busy=false;
    return function(...args){
        const context = this;
        if(!busy){
            busy = true;
            setTimeout(() => {
                fn.apply(context,args);
                busy = false;
            }, delay);
        }
    }
}

function onScroll() {
    console.log('Scroll position:', window.scrollY);
  }
  
const throttledScroll = throttle(onScroll, 1000);

window.addEventListener('scroll', throttledScroll);
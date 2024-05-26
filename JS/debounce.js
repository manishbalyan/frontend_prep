function debounce(fn,delay){
    let timer ;
    return function(...args){
        const context = this;
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context,args);
        }, delay);
    }
}

function search(query) {
    console.log(`Searching for: ${query}`);
  }

const debouncedSearch = debounce(search, 300);

const searchBox = document.getElementById('searchBox');
if(searchBox){
    searchBox.addEventListener('input', function(event) {
        debouncedSearch(event.target.value);
      });
}
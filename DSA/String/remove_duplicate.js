function replace(sentence, character, index) {
    return sentence.substr(0,index) + character + sentence.substr(index+1)
  }
  
  function removeDuplicatesFromString(sentence) {
    if(!sentence) return;
    let set = new Set([]);
    let rp = 0;
    let wp = 0;
  
    while(rp<sentence.length){
      if(!set.has(sentence[rp])){
        set.add(sentence[rp]);
        sentence = replace(sentence,sentence[rp], wp);
        wp++;
      }
      rp++
    }
    return sentence.substr(0,wp);
  };
  
console.log(removeDuplicatesFromString('Hello World'), 'result');
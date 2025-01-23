function reverse(arr, start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
}


function reverseWords(s) {
    let arr = s.split('');
    reverse(arr, 0, arr.length - 1);
    let start = 0;
  
    for (let end = 0; end <= arr.length; end++) {
      if (end === arr.length || arr[end] === ' ') {
        reverse(arr, start, end - 1);
        start = end + 1;
      }
    }
  
    return arr.join('');
}
    
  console.log(reverseWords("Hello World from JavaScript"), 'result');
  
function countPalindrom(s,left,right){
    let count = 0;
    while(left>=0 && right<s.length && s[left]===s[right]){
        count++;
        left--;
        right++;
    }
    return count;
}

function findPalindroms(s){
    let count = 0;
    for(let i = 0; i<s.length; i++){
        count += countPalindrom(s,i,i);
        count += countPalindrom(s,i,i+1);
    }
    return count;
}

console.log(findPalindroms('aabbbaa'),'result');
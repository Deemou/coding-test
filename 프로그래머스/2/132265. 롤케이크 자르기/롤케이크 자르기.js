function solution(topping) {
    let answer = 0;
    const length = topping.length;
    const left = Array(length).fill(0);
    const right = Array(length).fill(0);
    const leftSet = new Set();
    const rightSet = new Set();
    
    for(let i = 0; i < length-1; i++) {
        leftSet.add(topping[i]);
        left[i] = leftSet.size;
    }
    
    for(let i = length-1; i > 0; i--) {
        rightSet.add(topping[i]);
        right[i] = rightSet.size;
    }
    
    for(let i = 0; i < length-1; i++) {
        if(left[i] === right[i+1]) answer++;
    }
    
    return answer;
}

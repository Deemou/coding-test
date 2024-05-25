function solution(n) {
    let numContNums = 1;
    let answer = 0;
    
    while(n > 0){
        if(n % numContNums === 0) answer++
        n -= numContNums 
        numContNums++
    }
    
    return answer;
}
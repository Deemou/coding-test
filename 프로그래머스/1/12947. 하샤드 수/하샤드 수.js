function solution(x) {
    const digitSum = x.toString().split("").map(Number).reduce((acc,cur)=>acc+cur,0)
    return x%digitSum===0;
}
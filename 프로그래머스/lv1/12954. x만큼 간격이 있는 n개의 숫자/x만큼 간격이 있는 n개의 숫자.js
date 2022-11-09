function solution(x, n) {
    const arr = [];
    const cnt = x;
    for(let i=0; i<n; i++) {
        arr.push(x);
        x += cnt;
    }
    return arr;
}
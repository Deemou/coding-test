// 제곱수의 약수의 개수는 항상 홀수이다.
function solution(left, right) {
    let sum = 0;
    for (let n = left; n <= right; n++) {
        if (Number.isInteger(Math.sqrt(n))) {
            sum -= n;
        } else {
            sum += n;
        }
    }
    return sum;
}
function solution(n) {
    let answer = '';
    const numbers = ['4', '1', '2'];

    while (n > 0) {
        answer = numbers[n % 3] + answer;
        n = Math.ceil(n / 3) - 1;
    }

    return answer;
}

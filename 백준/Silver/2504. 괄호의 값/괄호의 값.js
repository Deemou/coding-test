function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const str = fs.readFileSync(filePath).toString().trim();
  const stack = [];

  let sum = 0; // 누적해서 더해질 값
  let num = 1; // 현재 가치

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      num *= 2;
      stack.push(str[i]);
    } else if (str[i] === "[") {
      num *= 3;
      stack.push(str[i]);
    } else if (str[i] === ")") {
      if (stack.pop() !== "(") return 0;
      if (str[i - 1] === "(") sum += num;
      num /= 2; // 소괄호 쌍이 사라졌으니 2로 나눔
    } else {
      if (stack.pop() !== "[") return 0;
      if (str[i - 1] === "[") sum += num;
      num /= 3; // 대괄호 쌍이 사라졌으니 3로 나눔
    }
  }

  return stack.length ? 0 : sum;
}

console.log(solution());

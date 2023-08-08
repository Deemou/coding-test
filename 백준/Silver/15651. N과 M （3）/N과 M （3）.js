function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(" ")
    .map(Number);
  const [n, m] = input;

  const ans = [];

  func(0, []);

  return ans.join("\n");

  function func(k, p) {
    if (k === m) {
      let str = "";
      for (let i = 0; i < k; i++) {
        str += p[i] + " ";
      }
      ans.push(str);
      return;
    }
    for (let i = 1; i <= n; i++) {
      func(k + 1, [...p, i]);
    }
  }
}

console.log(solution());

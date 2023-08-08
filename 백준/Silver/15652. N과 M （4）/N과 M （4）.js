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

  func(0, 1, []);

  return ans.join("\n");

  function func(k, idx, p) {
    if (k === m) {
      let str = "";
      for (let i = 0; i < k; i++) {
        str += p[i] + " ";
      }
      ans.push(str);
      return;
    }
    for (let i = idx; i <= n; i++) {
      func(k + 1, i, [...p, i]);
    }
  }
}

console.log(solution());

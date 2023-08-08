function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    .map((v) => v.split(" ").map(Number));

  const [n, m] = input[0];
  const nums = input[1].sort((a, b) => a - b);
  const ans = new Set();

  func(0, 0, []);

  return [...ans].join("\n");

  function func(k, idx, p) {
    if (k === m) {
      let str = "";
      for (let i = 0; i < k; i++) {
        str += p[i] + " ";
      }
      ans.add(str);
      return;
    }
    for (let i = idx; i < n; i++) {
      func(k + 1, i + 1, [...p, nums[i]]);
    }
  }
}

console.log(solution());

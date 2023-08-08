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

  const arr = new Array(n);
  const used = new Array(n + 1);
  const ans = [];

  func(0);

  return ans.join("\n");

  function func(k) {
    if (k === m) {
      let str = "";
      for (let i = 0; i < k; i++) {
        str += arr[i] + " ";
      }
      ans.push(str);
    }
    for (let i = 1; i <= n; i++) {
      if (used[i]) continue;
      arr[k] = i;
      used[i] = true;
      func(k + 1);
      used[i] = false;
    }
  }
}

console.log(solution());

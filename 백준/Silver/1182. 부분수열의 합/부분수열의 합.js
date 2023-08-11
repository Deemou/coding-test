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

  const [n, s] = input[0];
  const nums = input[1];
  let ans = 0;
  if (s === 0) ans--;

  func(0, 0);

  return ans;

  function func(idx, sum) {
    if (idx === n) {
      if (sum === s) ans++;
      return;
    }
    func(idx + 1, sum);
    func(idx + 1, sum + nums[idx]);
  }
}

console.log(solution());

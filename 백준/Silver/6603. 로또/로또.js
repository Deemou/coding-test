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
  input.pop();

  const limit = 6;
  const ans = [];

  for (let i = 0; i < input.length; i++) {
    const k = input[i].shift();
    const nums = input[i];

    func(0, 0, []);

    if (i === input.length - 1) continue;
    ans.push("");

    function func(length, idx, p) {
      if (length === limit) {
        let str = "";
        for (let i = 0; i < limit; i++) {
          str += p[i] + " ";
        }
        ans.push(str);
        return;
      }
      for (let i = idx; i < k; i++) {
        func(length + 1, i + 1, [...p, nums[i]]);
      }
    }
  }

  return ans.join("\n");
}

console.log(solution());

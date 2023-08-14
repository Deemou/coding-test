function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs.readFileSync(filePath).toString().trim();
  const n = +input;
  let ans;
  const nums = ["1"];

  func(1);

  return ans;

  function func(length) {
    if (ans) return;

    if (length === n) {
      ans = nums.join("");
      return;
    }

    const str = nums.join("");
    for (let i = 1; i <= 3; i++) {
      let flag = 1;
      const newStr = str + i;
      for (let len = 1; len <= Math.floor((length + 1) / 2); len++) {
        const backIdx = length + 1 - len;
        const frontIdx = backIdx - len;
        const str1 = newStr.slice(frontIdx, backIdx);
        const str2 = newStr.slice(backIdx);
        if (str1 === str2) {
          flag = 0;
          break;
        }
      }
      if (flag) {
        nums.push(i);
        func(length + 1);
        nums.pop(i);
      }
    }
  }
}

console.log(solution());

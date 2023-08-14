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
    for (let num = 1; num <= 3; num++) {
      let isGood = true;
      const newStr = str + num;
      const newLength = length + 1;

      for (let len = 1; len <= Math.floor(newLength / 2); len++) {
        const backIdx = newLength - len;
        const frontIdx = backIdx - len;
        const str1 = newStr.slice(frontIdx, backIdx);
        const str2 = newStr.slice(backIdx);

        if (str1 === str2) {
          isGood = false;
          break;
        }
      }

      if (isGood) {
        nums.push(num);
        func(length + 1);
        nums.pop(num);
      }
    }
  }
}

console.log(solution());

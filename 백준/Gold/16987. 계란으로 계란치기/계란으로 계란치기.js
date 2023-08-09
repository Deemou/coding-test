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

  const [totalEggCnt] = input[0];
  const eggs = input.slice(1);

  let brokenCnt = 0;
  let ans = 0;
  func(0);
  return ans;

  function func(idx) {
    if (idx === totalEggCnt) {
      ans = Math.max(ans, brokenCnt);
      return;
    }
    if (eggs[idx][0] <= 0 || brokenCnt === totalEggCnt - 1) {
      func(idx + 1);
      return;
    }
    for (let i = 0; i < totalEggCnt; i++) {
      if (idx === i) continue;
      if (eggs[i][0] <= 0) continue;
      eggs[idx][0] -= eggs[i][1];
      eggs[i][0] -= eggs[idx][1];
      if (eggs[idx][0] <= 0) brokenCnt++;
      if (eggs[i][0] <= 0) brokenCnt++;
      func(idx + 1);
      if (eggs[idx][0] <= 0) brokenCnt--;
      if (eggs[i][0] <= 0) brokenCnt--;
      eggs[idx][0] += eggs[i][1];
      eggs[i][0] += eggs[idx][1];
    }
  }
}

console.log(solution());

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    solution();
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const n = +input();
  const nums = input().split(" ").map(Number);
  let start = 0;
  let end = n - 1;
  let minSum = Infinity;
  let ans;

  while (start < end) {
    const lowVal = nums[start];
    const highVal = nums[end];
    const sum = lowVal + highVal;

    if (Math.abs(sum) < minSum) {
      minSum = Math.abs(sum);
      ans = [lowVal, highVal];
    }

    if (sum < 0) start++;
    else end--;
  }

  console.log(ans.join(" "));
}

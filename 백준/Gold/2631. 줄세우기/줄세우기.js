const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const readline = require("readline");
let line = 0;
const lines = [];
const input = () => lines[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    lines.push(line);
  }).on("close", () => {
    console.log(solution());
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const n = Number(input());
  const nums = Array.from({ length: n }, () => Number(input()));
  const lis = [nums[0]];

  for (let i = 1; i < n; i++) {
    const num = nums[i];
    if (num > lis.at(-1)) lis.push(num);
    else {
      const pos = binarySearch(num);
      lis[pos] = num;
    }
  }

  return n - lis.length;

  function binarySearch(num) {
    let left = 0,
      right = lis.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (lis[mid] < num) left = mid + 1;
      else right = mid;
    }

    return left;
  }
}


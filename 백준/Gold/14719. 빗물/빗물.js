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
  const [H, W] = input().split(" ").map(Number);
  const blocks = input().split(" ").map(Number);

  const leftMax = Array(W).fill(0);
  const rightMax = Array(W).fill(0);
  let totalWater = 0;

  let maxHeightLeft = blocks[0];
  for (let i = 0; i < W; i++) {
    maxHeightLeft = Math.max(maxHeightLeft, blocks[i]);
    leftMax[i] = maxHeightLeft;
  }

  let maxHeightRight = blocks[W - 1];
  for (let i = W - 1; i >= 0; i--) {
    maxHeightRight = Math.max(maxHeightRight, blocks[i]);
    rightMax[i] = maxHeightRight;
  }

  for (let i = 0; i < W; i++) {
    totalWater += Math.min(leftMax[i], rightMax[i]) - blocks[i];
  }

  return totalWater;
}

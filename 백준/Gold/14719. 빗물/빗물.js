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
  const stack = [];
  let totalWater = 0;

  for (let i = 0; i < W; i++) {
    const currentHeight = blocks[i];
    let lastFilledHeight = 0;

    while (stack.length) {
      const [lastIndex, lastHeight] = stack.at(-1);
      const waterWidth = i - lastIndex - 1;
      const waterHeight =
        Math.min(currentHeight, lastHeight) - lastFilledHeight;
      const amount = waterWidth * waterHeight;
      totalWater += amount;
      lastFilledHeight += waterHeight;

      if (lastHeight <= currentHeight) stack.pop();
      if (lastHeight >= currentHeight) break;
    }

    stack.push([i, currentHeight]);
  }

  return totalWater;
}

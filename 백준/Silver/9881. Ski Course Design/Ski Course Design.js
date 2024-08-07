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
  const heights = Array.from({ length: n }, () => Number(input()));
  let minCost = Infinity;

  const calculateCost = (low, high) => {
    let cost = 0;
    for (let height of heights) {
      if (height < low) cost += Math.pow(low - height, 2);
      else if (height > high) cost += Math.pow(height - high, 2);
    }

    return cost;
  };

  for (let low = 0; low <= 100; low++) {
    const high = low + 17;
    const cost = calculateCost(low, high);
    if (cost < minCost) {
      minCost = cost;
    }
  }

  return minCost;
}

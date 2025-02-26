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
  const words = Array.from({ length: n }, () => input());
  const alphabetMap = new Map();

  for (const word of words) {
    let placeValue = 1;
    for (let i = word.length - 1; i >= 0; i--) {
      const char = word[i];
      alphabetMap.set(char, (alphabetMap.get(char) || 0) + placeValue);
      placeValue *= 10;
    }
  }

  const sortedValues = [...alphabetMap.values()].sort((a, b) => b - a);

  let number = 9;
  return sortedValues.reduce((sum, val) => sum + val * number--, 0);
}

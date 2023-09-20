const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

readFile(filePath);

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    console.log(solution());
    process.exit();
  });
}

function solution() {
  const n = +input();
  const mod = n % 10;
  const numberOfThree = getNumberOfThree(mod);
  const rest = n - 3 * numberOfThree;

  if (rest < 0) return -1;
  const numberOfFive = rest / 5;
  return numberOfFive + numberOfThree;

  function getNumberOfThree(num) {
    switch (num % 5) {
      case 0:
        return 0;
      case 1:
        return 2;
      case 2:
        return 4;
      case 3:
        return 1;
      case 4:
        return 3;
    }
  }
}

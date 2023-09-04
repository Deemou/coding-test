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
  const words = [];
  for (let i = 0; i < n; i++) {
    const word = input();
    words.push(word);
  }
  words.sort((a, b) => {
    if (a.length < b.length) return -1;
    if (a.length > b.length) return 1;

    let sumA = digitSum(a);
    let sumB = digitSum(b);
    if (sumA < sumB) return -1;
    if (sumA > sumB) return 1;

    if (a < b) return -1;
    if (a > b) return 1;
  });

  console.log(words.join("\n"));

  function digitSum(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      if (!isNaN(+str[i])) sum += +str[i];
    }
    return sum;
  }
}

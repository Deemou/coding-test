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
  const [a, b, c] = input().split(" ").map(BigInt);
  console.log(+pow(a, b).toString());

  function pow(n1, n2) {
    if (n2 === BigInt(1)) return n1 % c;
    const half = pow(n1, n2 / BigInt(2));
    const result = (half * half) % c;

    return n2 % BigInt(2) === BigInt(0) ? result : (result * n1) % c;
  }
}

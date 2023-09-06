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
    solution();
    process.exit();
  });
}

function solution() {
  const N = +input();
  let A = [],
    B = [],
    C = [],
    D = [];

  for (let i = 0; i < N; i++) {
    const [a, b, c, d] = input().split(" ").map(Number);
    A.push(a);
    B.push(b);
    C.push(c);
    D.push(d);
  }

  let answer = 0;
  let mapAB = new Map();

  for (let a of A) {
    for (let b of B) {
      let sumAB = a + b;
      const cnt = mapAB.get(sumAB) || 0;
      mapAB.set(sumAB, cnt + 1);
    }
  }

  for (let c of C) {
    for (let d of D) {
      let sumCD = -(c + d); // 합이 0
      if (mapAB.has(sumCD)) answer += mapAB.get(sumCD);
    }
  }

  console.log(answer);
}

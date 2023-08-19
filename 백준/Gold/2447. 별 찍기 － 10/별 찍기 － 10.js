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
  const N = input();
  const board = Array.from({ length: N }).map(() =>
    Array.from({ length: N }).fill("*")
  );
  let ans = [];

  func(N, 0, 0);

  for (let i = 0; i < N; i++) {
    ans.push(board[i].join(""));
  }
  console.log(ans.join("\n"));

  function func(n, r, c) {
    if (n === 1) return;

    const third = n / 3;
    const double = 2 * third;

    for (let i = r + third; i < r + double; i++) {
      for (let j = c + third; j < c + double; j++) {
        board[i][j] = " ";
      }
    }

    func(third, r, c);
    func(third, r, c + third);
    func(third, r, c + double);
    func(third, r + third, c);
    func(third, r + third, c + double);
    func(third, r + double, c);
    func(third, r + double, c + third);
    func(third, r + double, c + double);
  }
}

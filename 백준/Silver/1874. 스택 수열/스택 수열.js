const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
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
  const stack = [];
  const ans = [];
  let currentNum = 1;

  for (let i = 0; i < n; i++) {
    const num = +input();
    if (stack.length === 0 || stack.at(-1) < num) {
      pushStack(currentNum, num);
    } else if (stack.at(-1) === num) {
      stack.pop();
      ans.push("-");
    } else {
      return "NO";
    }
  }

  function pushStack(from, to) {
    for (let j = from; j <= to; j++) {
      stack.push(j);
      ans.push("+");
      currentNum++;
    }
    stack.pop();
    ans.push("-");
  }

  return ans.join("\n");
}

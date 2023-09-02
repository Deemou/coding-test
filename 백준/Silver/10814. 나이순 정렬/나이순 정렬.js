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
  const lists = [];
  for (let i = 0; i < n; i++) {
    const [age, name] = input().split(" ");
    lists.push([+age, name]);
  }
  lists.sort((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
  });
  let ans = [];
  for (let i = 0; i < n; i++) {
    ans.push(`${lists[i][0]} ${lists[i][1]}`);
  }
  console.log(ans.join("\n"));
}

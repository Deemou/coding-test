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
  const S = input();
  let string = [];
  const answer = [];
  let isTag = false;

  for (let i = 0; i < S.length; i++) {
    const ch = S[i];
    if (ch === "<") {
      isTag = true;
      answer.push(string.reverse().join(""));
      string = [];
      string.push(ch);
    } else if (ch === ">") {
      isTag = false;
      string.push(ch);
      answer.push(string.join(""));
      string = [];
    } else if (ch === " " && !isTag) {
      answer.push(string.reverse().join("") + ch);
      string = [];
    } else {
      string.push(ch);
    }
  }

  answer.push(string.reverse().join(""));

  return answer.join("");
}

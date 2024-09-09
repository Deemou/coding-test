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
  const target = input().split(" ").join("");
  const targetClockNum = getClockNum(target);
  const allClockNums = getAllClockNums();
  return allClockNums.indexOf(targetClockNum) + 1;
}

function getClockNum(num) {
  let min = Number(num);
  for (let i = 0; i < 4; i++) {
    const n = Number(num.slice(i) + num.slice(0, i));
    min = Math.min(min, n);
  }
  return min.toString();
}

function getAllClockNums() {
  const allNums = getAllNums(4).map((v) => v.join(""));
  const allClockNums = new Set();
  allNums.forEach((num) => {
    const clockNum = getClockNum(num);
    allClockNums.add(clockNum);
  });
  return [...allClockNums].sort();
}

function getAllNums(digit) {
  if (digit === 1) {
    const arr = [];
    for (let i = 1; i <= 9; i++) {
      arr.push([i]);
    }
    return arr;
  }

  const arr = [];
  for (let i = 1; i <= 9; i++) {
    const nums = getAllNums(digit - 1);
    const nn = nums.map((v) => [i, ...v]);
    arr.push(...nn);
  }
  return arr;
}

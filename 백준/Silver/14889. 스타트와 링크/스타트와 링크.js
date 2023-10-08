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
  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(input().split(" ").map(Number));
  }

  const halfMembers = n / 2;

  function getCombinations(arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((value) => [value]);

    arr.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1);
      const combinationsRest = getCombinations(rest, selectNumber - 1);
      const attachedCombinationsRest = combinationsRest.map((combination) => [
        fixed,
        ...combination,
      ]);
      results.push(...attachedCombinationsRest);
    });

    return results;
  }

  const numbers = Array.from({ length: n }, (_, i) => i);
  const combinations = getCombinations(numbers, halfMembers);

  function getScores(arr) {
    let sum = 0;
    for (let i = 0; i < halfMembers - 1; i++) {
      for (j = i + 1; j < halfMembers; j++) {
        sum += board[arr[i]][arr[j]] + board[arr[j]][arr[i]];
      }
    }
    return sum;
  }

  const diffs = [];
  for (let i = 0; i < combinations.length; i++) {
    const scoreStar = getScores(combinations[i]);
    const scoreLink = getScores(
      numbers.filter((v) => !combinations[i].includes(v))
    );
    const diff = Math.abs(scoreStar - scoreLink);
    diffs.push(diff);
  }

  return Math.min(...diffs);
}

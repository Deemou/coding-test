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
  const n = 5;
  const cards = Array.from({ length: n }, () => input().split(" "));
  const nums = getNums(cards);
  const maxNum = nums[n - 1];
  let score = 0;

  if (isStraightFlush(cards)) {
    score = 900 + maxNum;
  } else if (isFourOfAKind(cards)) {
    score = 800 + nums[2];
  } else if (isFullHouse(cards)) {
    let bonus = 10 * nums[2];
    if (nums[0] === nums[2]) bonus += nums[3];
    else bonus += nums[0];
    score = 700 + bonus;
  } else if (isFlush(cards)) {
    score = 600 + maxNum;
  } else if (isStraight(cards)) {
    score = 500 + maxNum;
  } else if (isThreeOfAKind(cards)) {
    score = 400 + nums[2];
  } else if (isTwoPair(cards)) {
    score = 300 + nums[1] + 10 * nums[3];
  } else if (isOnePair(cards)) {
    let bonus = 0;
    for (let i = 0; i < 4; i++) {
      if (nums[i] === nums[i + 1]) {
        bonus = nums[i];
        break;
      }
    }
    score = 200 + bonus;
  } else {
    score = 100 + maxNum;
  }

  return score;
}

function isStraightFlush(cards) {
  return isStraight(cards) && isFlush(cards);
}

function isFourOfAKind(cards) {
  const nums = getNums(cards);
  return nums[0] === nums[3] || nums[1] === nums[4];
}

function isFullHouse(cards) {
  const nums = getNums(cards);
  return (
    (nums[0] === nums[1] && nums[2] === nums[4]) ||
    (nums[0] === nums[2] && nums[3] === nums[4])
  );
}

function isStraight(cards) {
  const nums = getNums(cards);
  for (let i = 1; i < 5; i++) {
    if (nums[i] !== nums[i - 1] + 1) return false;
  }
  return true;
}

function isFlush(cards) {
  const colors = getColors(cards);
  return colors[0] === colors[4];
}

function isThreeOfAKind(cards) {
  const nums = getNums(cards);
  for (let i = 0; i < 3; i++) {
    if (nums[i] === nums[i + 2]) return true;
  }
  return false;
}

function isTwoPair(cards) {
  const nums = getNums(cards);
  return (
    (nums[0] === nums[1] && nums[2] === nums[3]) ||
    (nums[0] === nums[1] && nums[3] === nums[4]) ||
    (nums[1] === nums[2] && nums[3] === nums[4])
  );
}

function isOnePair(cards) {
  const nums = getNums(cards);
  for (let i = 0; i < 4; i++) {
    if (nums[i] === nums[i + 1]) return true;
  }
  return false;
}

function getColors(cards) {
  return cards.map((v) => v[0]).sort();
}

function getNums(cards) {
  return cards.map((v) => Number(v[1])).sort((a, b) => a - b);
}

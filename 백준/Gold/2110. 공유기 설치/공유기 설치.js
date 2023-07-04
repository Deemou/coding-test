let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, c] = input
  .shift()
  .split(" ")
  .map((v) => +v);
let coords = input.map((v) => +v).sort((a, b) => a - b);

function count(coords, dist) {
  let lastPosition = coords[0];
  let cnt = 1;

  for (let i = 1; i < coords.length; i++) {
    if (coords[i] - lastPosition >= dist) {
      cnt++;
      lastPosition = coords[i];
    }
  }

  return cnt;
}

let min = 1;
// (양 끝 사이 거리) / (몇 분할)
let max = Math.floor((coords[n - 1] - coords[0]) / (c - 2 + 1));

while (min <= max) {
  let mid = Math.floor((min + max) / 2);
  if (count(coords, mid) >= c) {
    min = mid + 1;
  } else {
    max = mid - 1;
  }
}

console.log(max);

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, X] = input[0].split(" ").map((v) => +v);
const num = input[1].split(" ").map((v) => +v);

const arr = [];
for (let i = 0; i < N; i++) {
  if (num[i] < X) arr.push(num[i]);
}

console.log(arr.join(" "));

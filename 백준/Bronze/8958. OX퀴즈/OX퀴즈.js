const fs = require("fs");
const [n, ...input] = fs.readFileSync("/dev/stdin").toString().split("\n");

for (let i = 0; i < n; i++) {
  let sum = 0;
  let acc = 1;

  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === "O") {
      sum += acc;
      acc++;
    } else acc = 1;
  }

  console.log(sum);
}

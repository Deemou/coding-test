const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString();

const regExp = new RegExp(/\+|-/g);
const nums = input.split(regExp);
const ops = input.match(regExp);

const idx = ops ? ops.findIndex((op) => op === "-") : -1;

let sum = 0;
if (idx === -1) {
  for (let i = 0; i < nums.length; i++) {
    sum += +nums[i];
  }
} else {
  for (let i = 0; i <= idx; i++) {
    sum += +nums[i];
  }
  for (let i = idx + 1; i < nums.length; i++) {
    sum -= +nums[i];
  }
}

console.log(sum);

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim();
let front = 0;
const arr = [];
for (let i = 1; i <= input; i++) arr.push(i);

while (arr.length - 1 !== front) {
  front++;
  arr.push(arr[front]);
  front++;
}

console.log(arr[front]);

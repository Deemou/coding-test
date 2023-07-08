let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("");

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const arr = new Array(26).fill(0);

input.forEach((i) => arr[alphabet.indexOf(i)]++);
console.log(arr.join(" "));

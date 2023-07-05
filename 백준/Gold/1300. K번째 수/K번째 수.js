let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = input.map((v) => +v);

let min = 1,
  max = k;
let ans = 0;

while (min <= max) {
  let mid = Math.floor((min + max) / 2);

  let cnt = 0;
  for (let i = 1; i <= n; i++) {
    cnt += Math.min(Math.floor(mid / i), n);
  }

  if (cnt >= k) {
    ans = mid;
    max = mid - 1;
  } else min = mid + 1;
}

console.log(ans);

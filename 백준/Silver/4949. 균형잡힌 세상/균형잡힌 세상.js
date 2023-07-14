const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
input.pop();

const open = ["(", "["];
const close = [")", "]"];
const closeToOpen = {
  ")": "(",
  "]": "[",
};
const ans = [];

input.forEach((v) => {
  let isBalanced = true;
  const stack = [];
  for (let i = 0; i < v.length; i++) {
    if (open.includes(v[i])) stack.push(v[i]);
    else if (close.includes(v[i])) {
      if (stack.pop() !== closeToOpen[v[i]]) {
        ans.push("no");
        isBalanced = false;
        break;
      }
    }
  }
  if (isBalanced) {
    if (stack.length === 0) ans.push("yes");
    else ans.push("no");
  }
});
console.log(ans.join("\n"));

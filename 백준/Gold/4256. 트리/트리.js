const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    solution();
    process.exit();
  });
}

readFile(filePath);

class Node {
  constructor(v) {
    this.value = v;
    this.left = null;
    this.right = null;
  }

  appendLeft(v) {
    this.left = v;
  }

  appendRight(v) {
    this.right = v;
  }
}

function solution() {
  const t = +input();
  for (let tc = 0; tc < t; tc++) {
    const n = +input();
    const preorderResult = input().split(" ").map(Number);
    const inorderResult = input().split(" ").map(Number);
    let idx = 0;
    let ans = [];
    const root = BT([...inorderResult]);
    postorder(root);

    console.log(ans.join(" "));

    function BT(arr) {
      if (idx >= n) return null;
      if (!arr.length) return null;

      const val = preorderResult[idx++];
      const valIdx = arr.indexOf(val);
      const parent = new Node(val);

      const left = BT(arr.slice(0, valIdx));
      const right = BT(arr.slice(valIdx + 1));
      parent.appendLeft(left);
      parent.appendRight(right);
      return parent;
    }

    function postorder(node) {
      if (node.left) postorder(node.left);
      if (node.right) postorder(node.right);
      ans.push(node.value);
    }
  }
}

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
  const [N, M] = input().split(" ").map(Number);
  const parent = Array.from({ length: N + 1 }, (_, idx) => idx);
  const truePeople = input().split(" ").map(Number).slice(1);
  const parties = Array.from({ length: M }, () =>
    input().split(" ").map(Number).slice(1)
  );
  let answer = 0;

  for (const party of parties) {
    for (let j = 1; j < party.length; j++) {
      union(party[0], party[j]);
    }
  }

  for (let i = 1; i < truePeople.length; i++) {
    union(truePeople[0], truePeople[i]);
  }

  for (const party of parties) {
    let canLie = true;

    for (const person of party) {
      if (find(person) === find(truePeople[0])) {
        canLie = false;
        break;
      }
    }

    if (canLie) answer++;
  }

  return answer;

  function union(x, y) {
    x = find(x);
    y = find(y);
    if (x !== y) parent[y] = x;
  }

  function find(x) {
    if (parent[x] === x) return x;
    return (parent[x] = find(parent[x]));
  }
}

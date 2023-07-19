const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = input.shift();
const commands = input.map((v) => v.replace(/\r/g, ""));
const queue = [];
let front = 0;
let ans = "";

for (let i = 0; i < N; i++) {
  const [command, num] = commands[i].replace(/\r/g, "").split(" ");
  switch (command) {
    case "push":
      queue.push(+num);
      break;
    case "pop":
      const pop = queue[front];
      if (pop) front++;
      ans += (pop ? pop : -1) + "\n";
      break;
    case "size":
      ans += queue.length - front + "\n";
      break;
    case "empty":
      ans += queue.length - front === 0 ? 1 : 0;
      ans += "\n";
      break;
    case "front":
      ans += (queue.length - front === 0 ? -1 : queue[front]) + "\n";
      break;
    case "back":
      ans += (queue.length - front === 0 ? -1 : queue.at(-1)) + "\n";
      break;
  }
}

console.log(ans);

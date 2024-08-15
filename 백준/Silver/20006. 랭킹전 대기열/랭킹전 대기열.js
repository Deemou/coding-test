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
  const [p, m] = input().split(" ").map(Number);
  const rooms = [];
  const LEVEL_DIFF = 10;
  const START_MESSAGE = "Started!";
  const WAIT_MESSAGE = "Waiting!";
  const answer = [];

  for (let i = 0; i < p; i++) {
    const [lv, name] = input().split(" ");
    const level = Number(lv);
    const user = { level, name };

    let isRoomFound = false;
    for (let j = 0; j < rooms.length; j++) {
      const room = rooms[j];
      if (room.list.length >= m) continue;
      if (
        room.roomLevel + LEVEL_DIFF < level ||
        room.roomLevel - LEVEL_DIFF > level
      )
        continue;
      room.list.push(user);
      isRoomFound = true;
      break;
    }

    if (!isRoomFound) {
      const room = {
        roomLevel: level,
        list: [],
      };
      room.list.push(user);
      rooms.push(room);
    }
  }

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const list = room.list;

    if (list.length === m) answer.push(START_MESSAGE);
    else answer.push(WAIT_MESSAGE);

    list.sort((a, b) => {
      if (a.name < b.name) return -1;
      else return 1;
    });
    for (let j = 0; j < list.length; j++) {
      const user = list[j];
      answer.push(`${user.level} ${user.name}`);
    }
  }

  return answer.join("\n");
}

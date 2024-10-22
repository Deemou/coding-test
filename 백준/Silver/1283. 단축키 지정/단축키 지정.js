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
  const n = Number(input());
  const options = Array.from({ length: n }, () => input());
  const shortcuts = new Set();
  const answer = options.map((option) => {
    const shortcutIdx = findShortcutIndex(option);
    if (shortcutIdx !== null)
      return (
        option.slice(0, shortcutIdx) +
        `[${option[shortcutIdx]}]` +
        option.slice(shortcutIdx + 1)
      );
    else return option;
  });

  return answer.join("\n");

  function findShortcutIndex(option) {
    const words = option.split(" ");
    let idx = 0;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const firstLetter = word[0];
      const lowerdFirstLetter = firstLetter.toLowerCase();
      if (!shortcuts.has(lowerdFirstLetter)) {
        shortcuts.add(lowerdFirstLetter);
        return idx;
      }
      idx += word.length + 1;
    }

    for (let i = 0; i < option.length; i++) {
      const letter = option[i];
      const lowerdLetter = letter.toLowerCase();
      if (letter !== " " && !shortcuts.has(lowerdLetter)) {
        shortcuts.add(lowerdLetter);
        return i;
      }
    }

    return null;
  }
}

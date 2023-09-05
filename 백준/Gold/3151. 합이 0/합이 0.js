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

function solution() {
  const n = +input();
  const nums = input().split(" ").map(Number);
  nums.sort((a, b) => a - b);
  let cnt = 0;

  for (let i = 0; i < n - 2; i++) {
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        if (nums[left] === nums[right]) {
          // 왼쪽과 오른쪽 값이 같으면 그 사이에 있는 모든 값들은 동일
          const sameCnt = right - left;
          cnt += (sameCnt * (sameCnt + 1)) / 2;
          break;
        } else {
          let tempLeftIdx = left;
          let tempRightIdx = right;

          while (nums[tempLeftIdx] === nums[tempLeftIdx + 1]) tempLeftIdx++;
          while (nums[tempRightIdx] === nums[tempRightIdx - 1]) tempRightIdx--;

          cnt += (tempLeftIdx - left + 1) * (right - tempRightIdx + 1);

          left = tempLeftIdx + 1;
          right = tempRightIdx - 1;
        }
      } else if (sum > 0) right--;
      else left++;
    }
  }

  console.log(cnt);
}

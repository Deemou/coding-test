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
  const T = +input();
  const answer = [];

  for (let tc = 0; tc < T; tc++) {
    const [n, k, myId, m] = input().split(" ").map(Number);
    const scores = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));
    const submissionCnt = Array(n + 1).fill(0);
    const lastSubmission = Array(n + 1).fill(0);

    for (let i = 0; i < m; i++) {
      const [team, problem, score] = input().split(" ").map(Number);
      scores[team][problem] = Math.max(score, scores[team][problem]);
      submissionCnt[team]++;
      lastSubmission[team] = i;
    }

    const totalScores = scores.map((teamScores, team) => {
      const totalScore = teamScores.reduce((acc, cur) => acc + cur, 0);
      return {
        team,
        totalScore,
        submissionCnt: submissionCnt[team],
        lastSubmission: lastSubmission[team],
      };
    });

    totalScores.sort((a, b) => {
      if (a.totalScore !== b.totalScore) return b.totalScore - a.totalScore;
      if (a.submissionCnt !== b.submissionCnt)
        return a.submissionCnt - b.submissionCnt;
      return a.lastSubmission - b.lastSubmission;
    });

    const rank = totalScores.findIndex((x) => x.team === myId) + 1;
    answer.push(rank);
  }

  return answer.join("\n");
}

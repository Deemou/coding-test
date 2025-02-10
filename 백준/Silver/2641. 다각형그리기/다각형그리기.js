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
  const length = Number(input());
  const sampleSequence = input().split(" ").map(Number);
  const numSequences = Number(input());

  const sampleShape = getPolygonShape(sampleSequence);
  const validShapes = [];
  const answer = [];

  for (let i = 0; i < numSequences; i++) {
    const currentSequence = input().split(" ").map(Number);
    const currentShape = getPolygonShape(currentSequence);

    if (isShapeEqual(sampleShape, currentShape))
      validShapes.push(currentSequence);
  }

  answer.push(validShapes.length);
  validShapes.forEach((shape) => {
    answer.push(shape.join(" "));
  });

  return answer.join("\n");
}

function getPolygonShape(sequence) {
  const dirs = [
    [1, 0], // 오른쪽
    [0, 1], // 위쪽
    [-1, 0], // 왼쪽
    [0, -1], // 아래쪽
  ];

  let x = 0,
    y = 0;
  const points = [];

  for (const move of sequence) {
    x += dirs[move - 1][0];
    y += dirs[move - 1][1];
    points.push([x, y]);
  }

  return points;
}

function isShapeEqual(shape1, shape2) {
  return (
    JSON.stringify(normalizeShape(shape1)) ===
    JSON.stringify(normalizeShape(shape2))
  );
}

function normalizeShape(points) {
  points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const origin = points[0];
  return points.map((point) => [point[0] - origin[0], point[1] - origin[1]]);
}

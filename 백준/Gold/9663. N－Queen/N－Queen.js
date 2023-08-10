function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs.readFileSync(filePath).toString().trim();

  const n = Number(input);
  let ans = 0;
  const cols = Array.from({ length: n });
  const inclines = Array.from({ length: n });
  const declines = Array.from({ length: n });

  func(0);

  return ans;

  function func(row) {
    if (row === n) {
      ans++;
      return;
    }
    for (let col = 0; col < n; col++) {
      const incline = row + col;
      const decline = col - row;
      if (cols[col]) continue;
      if (inclines[incline]) continue;
      if (declines[decline]) continue;

      cols[col] = true;
      inclines[incline] = true;
      declines[decline] = true;
      func(row + 1);
      cols[col] = false;
      inclines[incline] = false;
      declines[decline] = false;
    }
  }
}

console.log(solution());

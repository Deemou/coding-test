function solution(n) {
  const answer = Array((n * (n + 1)) / 2).fill(0);
  console.log(answer.length);
  let dir = 0;
  let num = 1;
  let x = -1,
    y = 0;

  for (let i = n; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      // Down
      if (dir === 0) x++;
      // Right
      else if (dir === 1) y++;
      // Up
      else {
        x--;
        y--;
      }

      answer[(x * (x + 1)) / 2 + y] = num++;
    }

    dir = (dir + 1) % 3;
  }

  return answer;
}
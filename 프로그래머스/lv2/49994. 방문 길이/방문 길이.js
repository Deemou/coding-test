function solution(dirs) {
  const paths = new Map();
  const min = -5,
    max = 5;
  let current = [0, 0];
  const move = { L: [-1, 0], R: [1, 0], U: [0, 1], D: [0, -1] };

  for (let dir of dirs) {
    let next = [current[0] + move[dir][0], current[1] + move[dir][1]];
    if (next[0] < min || next[0] > max || next[1] < min || next[1] > max) continue;

    let key = '';
    if (['U', 'R'].includes(dir)) key = `${current}${next}`;
    else key = `${next}${current}`;
    paths.set(key, true);
    current = next;
  }

  return paths.size;
}
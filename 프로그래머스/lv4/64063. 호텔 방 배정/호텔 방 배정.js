function solution(k, room_number) {
  const answer = [];
  const map = new Map();

  room_number.forEach((num) => {
    const tmp = [];
    let idx = num;
    while (true) {
      if (!map.has(idx)) {
        map.set(idx, idx + 1);
        answer.push(idx);
        tmp.forEach((tmpNum) => {
          map.set(tmpNum, idx + 1);
        });
        break;
      }
      idx = map.get(idx);
      tmp.push(idx);
    }
  });
  return answer;
}
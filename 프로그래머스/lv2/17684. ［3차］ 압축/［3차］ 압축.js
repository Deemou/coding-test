function solution(msg) {
  const answer = [];
  const dict = new Map();
  let cnt = 26;

  for (let i = 0; i < 26; i++) {
    const ch = String.fromCharCode(i + 65);
    dict.set(ch, i + 1);
  }

  let [start, end] = [0, 1];
  let str = "";

  while (end <= msg.length) {
    str = msg.slice(start, end);
    if (dict.has(str)) end++;
    else {
      dict.set(str, ++cnt);
      const input = msg.slice(start, end - 1);
      answer.push(dict.get(input));
      start = end - 1;
    }
  }
  answer.push(dict.get(msg.slice(start, end - 1)));

  return answer;
}
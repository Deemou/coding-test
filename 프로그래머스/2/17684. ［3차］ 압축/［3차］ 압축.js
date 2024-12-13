function solution(msg) {
  const ALPHABET_COUNT = 26;
  const ASCII_A = 65;

  const dict = new Map();
  const answer = [];

  for (let i = 0; i < ALPHABET_COUNT; i++) {
    const ch = String.fromCharCode(i + ASCII_A);
    dict.set(ch, i + 1);
  }

  let [start, end] = [0, 1];

  while (end <= msg.length) {
    const str = msg.slice(start, end);
      
    if (dict.has(str)) end++;
    else {
      dict.set(str, dict.size + 1);
      const input = msg.slice(start, end - 1);
      answer.push(dict.get(input));
      start = end - 1;
    }
  }
  answer.push(dict.get(msg.slice(start, end - 1)));

  return answer;
}

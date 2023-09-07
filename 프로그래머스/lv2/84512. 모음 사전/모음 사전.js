const dict = new Map();
let vowel = ["A", "E", "I", "O", "U"];
let idx = 0;

function dfs(str, length) {
  if (length > 5) return;

  dict.set(str, idx++);
  for (let i = 0; i < 5; i++) {
    let next = str + vowel[i];
    dfs(next, length + 1);
  }
}

function solution(word) {
  dfs("", 0);
  return dict.get(word);
}
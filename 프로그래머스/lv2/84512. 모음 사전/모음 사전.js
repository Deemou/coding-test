function solution(word) {
  const vowel = ["A", "E", "I", "O", "U"];
  const str = [];
  const dict = [];

  for (let i = 1; i <= 5; i++) {
    dfs(i);
  }

  dict.sort();

  return dict.findIndex((v) => v === word) + 1;

  function dfs(limit) {
    if (str.length === limit) {
      dict.push(str.join(""));
      return;
    }

    for (let i = 0; i < 5; i++) {
      str.push(vowel[i]);
      dfs(limit);
      str.pop();
    }
  }
}
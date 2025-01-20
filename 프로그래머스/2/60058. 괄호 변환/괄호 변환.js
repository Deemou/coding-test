function solution(p) {
  if (p === "") return "";

  const [u, v] = splitBalanced(p);

  return transform(u, v);

  function splitBalanced(str) {
    let balance = 0;
    let idx = 0;

    while (idx < str.length) {
      balance += str[idx] === "(" ? 1 : -1;
      if (balance === 0) break;
      idx++;
    }

    const u = str.slice(0, idx + 1);
    const v = str.slice(idx + 1);

    return [u, v];
  }

  function transform(u, v) {
    if (isValid(u)) return u + solution(v);

    const newU = "(" + solution(v) + ")";
    const newV = u
      .slice(1, -1)
      .split("")
      .map((c) => (c === "(" ? ")" : "("))
      .join("");

    return newU + newV;
  }

  function isValid(str) {
    let balance = 0;
    for (const char of str) {
      balance += char === "(" ? 1 : -1;
      if (balance < 0) return false;
    }
    return balance === 0;
  }
}

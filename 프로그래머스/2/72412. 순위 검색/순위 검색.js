function solution(info, query) {
  const answer = [];
  const applicants = new Map();
  const UNCONDITIONAL = "-";

  for (let i = 0; i < info.length; i++) {
    const [lang, role, level, soulFood, score] = info[i].split(" ");
    const key = `${lang}${role}${level}${soulFood}`;

    if (!applicants.has(key)) applicants.set(key, []);

    applicants.get(key).push(Number(score));
  }

  for (const [k, v] of applicants) {
    v.sort((a, b) => a - b);
  }

  for (let i = 0; i < query.length; i++) {
    const [lang, role, level, last] = query[i].split(" and ");
    const [soulFood, score] = last.split(" ");
    const targetScore = Number(score);
    let cnt = 0;

    for (const [k, v] of applicants) {
      if (lang !== UNCONDITIONAL && !k.startsWith(lang)) continue;
      if (role !== UNCONDITIONAL && !k.includes(role)) continue;
      if (level !== UNCONDITIONAL && !k.includes(level)) continue;
      if (soulFood !== UNCONDITIONAL && !k.includes(soulFood)) continue;

      let left = 0,
        right = v.length - 1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (v[mid] >= targetScore) {
          cnt += right - mid + 1;
          right = mid - 1;
        } else left = mid + 1;
      }
    }

    answer.push(cnt);
  }

  return answer;
}
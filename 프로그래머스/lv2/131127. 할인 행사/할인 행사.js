function solution(want, number, discount) {
  let answer = 0;

  const map = new Map();
  for (let i = 0; i < want.length; i++) {
    map.set(want[i], number[i]);
  }

  for (let i = 0; i <= discount.length - 10; i++) {
    if (isSignupDay(i, new Map(map))) answer++;
  }

  return answer;

  function isSignupDay(day, list) {
    for (let i = day; i < day + 10; i++) {
      const item = discount[i];
      if (!list.has(item)) return false;

      const cnt = list.get(item) - 1;
      if (cnt < 0) return false;

      list.set(item, cnt);
    }
    return true;
  }
}

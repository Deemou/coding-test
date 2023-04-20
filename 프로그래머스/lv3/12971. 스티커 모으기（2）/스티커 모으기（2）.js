function solution(sticker) {
  const length = sticker.length;
  if (length === 1) return sticker[0];
  if (length === 2) return Math.max(sticker[0], sticker[1]);

  //select first sticker
  const dp1 = [sticker[0], sticker[0]];
  for (let i = 2; i < length - 1; i++) {
    dp1.push(Math.max(dp1[i - 1], dp1[i - 2] + sticker[i]));
  }

  //select second sticker
  const dp2 = [0, sticker[1]];
  for (let i = 2; i < length; i++) {
    dp2.push(Math.max(dp2[i - 1], dp2[i - 2] + sticker[i]));
  }

  return Math.max(dp1[length - 2], dp2[length - 1]);
}
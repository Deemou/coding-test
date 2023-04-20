function solution(sticker) {
  const length = sticker.length;
  if (length === 1) return sticker[0];
  if (length === 2) return Math.max(sticker[0], sticker[1]);

  const dp1 = sticker.slice(0, length - 1);
  const dp2 = sticker.slice(1);
  return Math.max(dp(dp1), dp(dp2));
}

function dp(arr) {
  arr[1] = Math.max(arr[0], arr[1]);
  for (let i = 2; i < arr.length; i++) {
    arr[i] = Math.max(arr[i - 1], arr[i - 2] + arr[i]);
  }
  return arr.at(-1);
}
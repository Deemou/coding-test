function solution(clothes) {
  const clothesCount = new Map();
  let combs = 1;

  clothes.forEach(([_, type]) => {
    clothesCount.set(type, (clothesCount.get(type) || 0) + 1);
  });

  for (const [_, cnt] of clothesCount) {
    combs *= cnt + 1;
  }

  return combs - 1;
}

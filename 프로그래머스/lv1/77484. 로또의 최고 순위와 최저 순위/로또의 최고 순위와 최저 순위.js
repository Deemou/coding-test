function solution(lottos, win_nums) {
  const prize = [6, 6, 5, 4, 3, 2, 1];
  let hitCount = 0;
  let unknownCount = 0;

  lottos.forEach((lottoNumber) => {
    if (lottoNumber == 0) unknownCount++;
    if (win_nums.includes(lottoNumber)) hitCount++;
  });

  const maxCount = hitCount + unknownCount;

  return [prize[maxCount], prize[hitCount]];
}

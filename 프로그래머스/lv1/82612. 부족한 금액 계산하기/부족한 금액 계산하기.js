//등차수열의 합
function solution(price, money, count) {
  const n = count,
    a = price,
    l = count * price;
  const pay = (n * (a + l)) / 2;
  const neededMoney = pay - money;
  return Math.max(neededMoney, 0);
}

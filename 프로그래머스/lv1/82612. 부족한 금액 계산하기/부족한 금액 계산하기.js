//등차수열의 합
function solution(price, money, count) {
  const pay = (count * (price + price * count)) / 2;
  const neededMoney = pay - money;
  if (neededMoney > 0) return neededMoney;
  return 0;
}

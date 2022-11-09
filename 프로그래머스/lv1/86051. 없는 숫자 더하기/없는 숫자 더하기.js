function solution(numbers) {
  const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return numberList.reduce((sum, num) => {
    if (!numbers.includes(num)) sum += num;
    return sum;
  }, 0);
}

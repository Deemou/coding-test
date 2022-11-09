function solution(n) {
  const arr = n.toString().split("");
  const descendingSortedArr = arr.sort((a, b) => {
    return a > b ? -1 : 0;
  });
  const num = Number(descendingSortedArr.join(""));
  return num;
}
function solution(arr1, arr2) {
  const resultArr = [];
  for (let row = 0; row < arr1.length; row++) {
    resultArr.push([]);
    for (let col = 0; col < arr1[row].length; col++) {
      resultArr[row].push(arr1[row][col] + arr2[row][col]);
    }
  }
  return resultArr;
}
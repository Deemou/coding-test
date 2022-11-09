function solution(arr) {
  const arrCopy = arr.slice();
  let minElementIndex = 0;
  for (let index = 1; index < arrCopy.length; index++) {
    if (arrCopy[index] < arrCopy[minElementIndex]) minElementIndex = index;
  }
  arrCopy.splice(minElementIndex, 1);
  if (arrCopy.length == 0) arrCopy.push(-1);
  return arrCopy;
}

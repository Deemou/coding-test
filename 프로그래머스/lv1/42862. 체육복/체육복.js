function solution(n, lost, reserve) {
  const numberOfClothesByStudent = new Array(n).fill(1);
  lost.forEach((studentNumber) => (numberOfClothesByStudent[studentNumber - 1] -= 1));
  reserve.forEach((studentNumber) => (numberOfClothesByStudent[studentNumber - 1] += 1));

  for (let studentNumber = 0; studentNumber < n; studentNumber++) {
    if (
      numberOfClothesByStudent[studentNumber] === 2 &&
      numberOfClothesByStudent[studentNumber - 1] === 0
    ) {
      numberOfClothesByStudent[studentNumber - 1]++;
      numberOfClothesByStudent[studentNumber]--;
    } else if (
      numberOfClothesByStudent[studentNumber] === 2 &&
      numberOfClothesByStudent[studentNumber + 1] === 0
    ) {
      numberOfClothesByStudent[studentNumber + 1]++;
      numberOfClothesByStudent[studentNumber]--;
    }
  }

  return numberOfClothesByStudent.reduce((count, numberOfClothes) => {
    if (numberOfClothes >= 1) count++;
    return count;
  }, 0);
}

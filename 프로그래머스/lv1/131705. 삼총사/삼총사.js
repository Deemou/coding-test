function solution(number) {
  const numberOfStudents = number.length;
  const TRIO = 0;
  let count = 0;
  for (let first = 0; first <= numberOfStudents - 3; first++) {
    for (let second = first + 1; second <= numberOfStudents - 2; second++) {
      for (let third = second + 1; third <= numberOfStudents - 1; third++) {
        const sum = number[first] + number[second] + number[third];
        if (sum === TRIO) count++;
      }
    }
  }
  return count;
}

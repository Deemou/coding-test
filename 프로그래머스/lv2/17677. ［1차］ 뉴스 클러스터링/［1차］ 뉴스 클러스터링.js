function solution(str1, str2) {
  const elementsA = [];
  const elementsB = [];
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  for (let i = 0; i < str1.length - 1; i++) {
    if (!isValid(str1[i], str1[i + 1])) continue;
    const slice = str1.slice(i, i + 2);
    elementsA.push(slice);
  }

  for (let i = 0; i < str2.length - 1; i++) {
    if (!isValid(str2[i], str2[i + 1])) continue;
    const slice = str2.slice(i, i + 2);
    elementsB.push(slice);
  }

  if (elementsA.length === 0 && elementsB.length === 0) return 65536;

  elementsA.sort();
  elementsB.sort();

  let intersect = 0;
  let union = 0;
  let [idxA, idxB] = [0, 0];

  while (idxA !== elementsA.length && idxB !== elementsB.length) {
    const a = elementsA[idxA];
    const b = elementsB[idxB];

    union++;
    if (a === b) {
      intersect++;
      idxA++;
      idxB++;
    } else if (a < b) {
      idxA++;
    } else {
      idxB++;
    }
  }
  union += elementsA.length - idxA + elementsB.length - idxB;
  console.log(intersect, union);

  return Math.floor((intersect / union) * 65536);

  function isValid(a, b) {
    return a >= "a" && a <= "z" && b >= "a" && b <= "z";
  }
}

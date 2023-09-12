function solution(str1, str2) {
  const elementsA = getElems(str1);
  const elementsB = getElems(str2);

  if (elementsA.length === 0 && elementsB.length === 0) return 65536;

  const set = new Set([...elementsA, ...elementsB]);
  const mapA = getMap(elementsA);
  const mapB = getMap(elementsB);

  let intersect = 0;
  let union = 0;

  set.forEach((v) => {
    const cntA = mapA.get(v) || 0;
    const cntB = mapB.get(v) || 0;
    intersect += Math.min(cntA, cntB);
    union += Math.max(cntA, cntB);
  });

  return Math.floor((intersect / union) * 65536);

  function getElems(text) {
    const result = [];

    for (let i = 0; i < text.length - 1; i++) {
      const elem = text.substr(i, 2);
      if (elem.match(/[A-Za-z]{2}/)) result.push(elem.toLowerCase());
    }

    return result;
  }

  function getMap(list) {
    const map = new Map();

    for (let i = 0; i < list.length; i++) {
      const elem = list[i];
      const cnt = map.get(elem) || 0;
      map.set(elem, cnt + 1);
    }

    return map;
  }
}

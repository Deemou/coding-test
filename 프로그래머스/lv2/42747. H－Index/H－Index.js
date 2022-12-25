function solution(citations) {
  let min = 0;
  let max = citations.length;
  for (let i = 0; i <= Math.ceil(Math.log2(citations.length)); i++) {
    if (min === max) return max;

    const mid = Math.ceil((min + max) / 2);
    const num = citations.filter((x) => x >= mid).length;
    if (num === mid) return mid;
    if (num > mid) min = mid;
    else max = mid - 1;
  }
}

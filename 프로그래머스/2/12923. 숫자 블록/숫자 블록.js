function solution(begin, end) {
  const blocks = Array(end - begin + 1).fill(0);
  const maxN = Math.min(Math.floor(end / 2), 10000000);

  for (let n = 1; n <= maxN; n++) {
    // begin 이상이면서 n의 배수 중 최솟값
    let i = Math.max(n * 2, begin + ((n - (begin % n)) % n));

    for (i; i <= end; i += n) {
      blocks[i - begin] = n;
    }
  }

  return blocks;
}
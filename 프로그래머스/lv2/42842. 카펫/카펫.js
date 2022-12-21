function solution(brown, yellow) {
  for (let yellowY = 1; yellowY <= Math.sqrt(yellow); yellowY++) {
    if (yellow % yellowY == 0) {
      const yellowX = yellow / yellowY;
      if (brown === (yellowX + yellowY + 2) * 2) {
        const width = yellowX + 2;
        const height = yellowY + 2;
        return [width, height];
      }
    }
  }
}

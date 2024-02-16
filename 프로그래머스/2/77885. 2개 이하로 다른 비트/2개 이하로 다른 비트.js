function solution(numbers) {
  return numbers.map((x) => {
    if (x % 2 === 0) return x + 1;
    else {
      const bin = "0" + x.toString(2);
      const idx = bin.lastIndexOf("0");
      return parseInt(bin.slice(0, idx) + "10" + bin.slice(idx + 2), 2);
    }
  });
}
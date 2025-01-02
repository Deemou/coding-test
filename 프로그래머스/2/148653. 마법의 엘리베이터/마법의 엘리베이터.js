function solution(storey) {
  let magicStones = 0;

  while (storey > 0) {
    const lastDigit = storey % 10;

    if (lastDigit < 5) magicStones += lastDigit;
    else if (lastDigit > 5) {
      magicStones += 10 - lastDigit;
      storey += 10 - lastDigit;
    } else {
      const nextDigit = Math.floor(storey / 10) % 10;
      magicStones += lastDigit;
      if (nextDigit >= 5) storey += lastDigit;
    }

    storey = Math.floor(storey / 10);
  }

  return magicStones;
}

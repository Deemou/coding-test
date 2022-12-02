//From Clean Code
function solution(n) {
  const primeCounter = new PrimeCounter();
  return primeCounter.count(n);
}

class PrimeCounter {
  #crossedOut;

  count(maxValue) {
    this.uncrossIntegersUpTo(maxValue);
    this.crossOutMultiples();
    return this.getNumberOfUncrossedIntegers();
  }

  getNumberOfUncrossedIntegers() {
    let count = 0;
    for (let i = 2; i < this.#crossedOut.length; i++) {
      if (this.isNotCrossed(i)) count++;
    }
    return count;
  }

  uncrossIntegersUpTo(maxValue) {
    this.#crossedOut = new Array(maxValue + 1);
    for (let i = 2; i < this.#crossedOut.length; i++)
      this.#crossedOut[i] = false;
  }

  crossOutMultiples() {
    const limit = Math.sqrt(this.#crossedOut.length);
    for (let i = 2; i <= limit; i++) {
      if (this.isNotCrossed(i)) this.crossOutMultiplesOf(i);
    }
  }

  crossOutMultiplesOf(i) {
    for (
      let multiple = 2 * i;
      multiple < this.#crossedOut.length;
      multiple += i
    )
      this.#crossedOut[multiple] = true;
  }

  isNotCrossed(i) {
    return this.#crossedOut[i] === false;
  }
}

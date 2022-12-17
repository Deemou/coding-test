function solution(n, arr1, arr2) {
  const completeMap = [];
  for (let i = 0; i < n; i++) {
    const path = arr1[i] | arr2[i];
    const decodedPath = decodePath(path, n);
    completeMap.push(decodedPath);
  }
  return completeMap;
}

function decodePath(path, n) {
  const WALL = '#';
  const BLANK = ' ';
  const WALL_REGEX = new RegExp('1', 'g');
  const BLANKL_REGEX = new RegExp('0', 'g');
  const binaryPath = decimalToNDigitBinary(path, n);
  return binaryPath.replace(WALL_REGEX, WALL).replace(BLANKL_REGEX, BLANK);
}

function decimalToNDigitBinary(decimal, n) {
  const ZERO = '0';
  const binary = decimal.toString(2);
  const numberOfZero = Math.min(n, n - binary.length);
  return ZERO.repeat(numberOfZero).concat(binary);
}
function solution(s) {
  return s.map(processBinaryString);
}

function processBinaryString(binaryString) {
  const targetPattern = "110";
  const regex = new RegExp(targetPattern, "g");
  const stack = [];
  let targetPatternCount = 0;

  for (const char of binaryString) {
    stack.push(char);

    if (stack.length >= 3 && stack.slice(-3).join("") === targetPattern) {
      targetPatternCount++;
      stack.pop();
      stack.pop();
      stack.pop();
    }
  }

  const modifiedString = stack.join("");
  if (targetPatternCount === 0) return modifiedString;

  const targetPatternString = targetPattern.repeat(targetPatternCount);
  const indexOf111 = modifiedString.indexOf("111");
  const indexOfLastZero = modifiedString.lastIndexOf("0");

  if (indexOf111 !== -1)
    return (
      modifiedString.slice(0, indexOf111) +
      targetPatternString +
      modifiedString.slice(indexOf111)
    );
  else if (indexOfLastZero !== -1)
    return (
      modifiedString.slice(0, indexOfLastZero + 1) +
      targetPatternString +
      modifiedString.slice(indexOfLastZero + 1)
    );
  else return targetPatternString + modifiedString;
}

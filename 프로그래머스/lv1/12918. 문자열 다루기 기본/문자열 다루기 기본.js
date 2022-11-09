function solution(s) {
  const allowedLength = [4, 6];
  if (!allowedLength.includes(s.length)) return false;
  for (let index = 0; index < s.length; index++) {
    const char = s.at(index);
    if (!/[0-9]/.test(char)) return false;
  }
  return true;
}

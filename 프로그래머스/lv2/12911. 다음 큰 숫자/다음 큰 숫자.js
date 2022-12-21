function solution(n) {
  const oneCount = [...n.toString(2).matchAll(/1/g)].length;
  while (true) {
    n++;
    if ([...n.toString(2).matchAll(/1/g)].length === oneCount) return n;
  }
}

function solution(n, lost, reserve) {
  const notHave = lost.filter((student) => !reserve.includes(student)).sort();
  const reallyReserve = reserve.filter((student) => !lost.includes(student)).sort();
  let count = 0;

  notHave.forEach((student) => {
    const prevStudent = student - 1;
    const nextStudent = student + 1;
    if (reallyReserve.includes(prevStudent)) {
      count++;
    } else if (reallyReserve.includes(nextStudent)) {
      const index = reallyReserve.findIndex((student) => student == nextStudent);
      reallyReserve[index] = 0;
      count++;
    }
  });
  return n - notHave.length + count;
}

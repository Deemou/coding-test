function solution(plans) {
  const MINUTES_IN_HOUR = 60;

  const answer = [];
  const stack = [];
  let currentTime = 0;

  plans.sort((a, b) => a[1].localeCompare(b[1]));

  for (const [name, startTime, duration] of plans) {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const startInMinutes = startHour * MINUTES_IN_HOUR + startMinute;
    const durationInMinutes = Number(duration);

    while (currentTime < startInMinutes) {
      if (stack.length === 0) break;

      const [topName, topDuration] = stack.pop();
      const remainingDuration = topDuration - (startInMinutes - currentTime);

      if (remainingDuration > 0) {
        stack.push([topName, remainingDuration]);
        currentTime = startInMinutes;
      } else {
        answer.push(topName);
        currentTime += topDuration;
      }
    }

    stack.push([name, durationInMinutes]);
    currentTime = startInMinutes;
  }

  while (stack.length > 0) {
    const [topName, topDuration] = stack.pop();
    answer.push(topName);
  }

  return answer;
}

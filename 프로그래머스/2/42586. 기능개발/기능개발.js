function solution(progresses, speeds) {
  const releaseCounts = [];
  const requiredDays = progresses.map((progress, idx) =>
    Math.ceil((100 - progress) / speeds[idx])
  );
  let maxDays = requiredDays[0];
  let completedFeatureCount = 1;

  for (let i = 1; i < requiredDays.length; i++) {
    if (requiredDays[i] <= maxDays) completedFeatureCount++;
    else {
      releaseCounts.push(completedFeatureCount);
      maxDays = requiredDays[i];
      completedFeatureCount = 1;
    }
  }
  releaseCounts.push(completedFeatureCount);

  return releaseCounts;
}

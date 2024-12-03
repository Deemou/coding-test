function solution(progresses, speeds) {
  const releaseCounts = [];
  const requiredDays = progresses.map((progress, idx) =>
    Math.ceil((100 - progress) / speeds[idx])
  );
  let daysUntilNextRelease = requiredDays[0];
  let completedFeatureCount = 1;

  for (let i = 1; i < requiredDays.length; i++) {
    if (requiredDays[i] <= daysUntilNextRelease) completedFeatureCount++;
    else {
      releaseCounts.push(completedFeatureCount);
      daysUntilNextRelease = requiredDays[i];
      completedFeatureCount = 1;
    }
  }
  releaseCounts.push(completedFeatureCount);

  return releaseCounts;
}

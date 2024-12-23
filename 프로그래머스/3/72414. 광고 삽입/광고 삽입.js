function solution(play_time, adv_time, logs) {
  const playSeconds = HMSToSeconds(play_time);
  const advSeconds = HMSToSeconds(adv_time);
  const viewerCountPerSegment = Array(playSeconds + 1).fill(0);
  let currentPlaytime = 0;
  let maxPlaytime = 0;
  let adStartTime = 0;

  for (const log of logs) {
    const [start, end] = log.split("-").map(HMSToSeconds);
    viewerCountPerSegment[start] += 1;
    viewerCountPerSegment[end] -= 1;
  }

  for (let i = 1; i <= playSeconds; i++) {
    viewerCountPerSegment[i] += viewerCountPerSegment[i - 1];
  }

  for (let i = 0; i < advSeconds; i++) {
    currentPlaytime += viewerCountPerSegment[i];
  }
  maxPlaytime = currentPlaytime;

  for (let i = advSeconds; i <= playSeconds; i++) {
    currentPlaytime +=
      viewerCountPerSegment[i] - viewerCountPerSegment[i - advSeconds];
    if (currentPlaytime > maxPlaytime) {
      maxPlaytime = currentPlaytime;
      adStartTime = i - advSeconds + 1;
    }
  }

  return secondsToHMS(adStartTime);
}

function HMSToSeconds(time) {
  const HOUR_IN_SECS = 3600;
  const MIN_IN_SECS = 60;

  const [h, m, s] = time.split(":").map(Number);

  return h * HOUR_IN_SECS + m * MIN_IN_SECS + s;
}

function secondsToHMS(seconds) {
  const HOUR_IN_SECS = 3600;
  const MIN_IN_SECS = 60;

  const h = String(Math.floor(seconds / HOUR_IN_SECS)).padStart(2, "0");
  seconds %= HOUR_IN_SECS;
  const m = String(Math.floor(seconds / MIN_IN_SECS)).padStart(2, "0");
  const s = String(seconds % MIN_IN_SECS).padStart(2, "0");

  return `${h}:${m}:${s}`;
}

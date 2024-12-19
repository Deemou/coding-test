function solution(video_len, pos, op_start, op_end, commands) {
  const PREV = "prev";
  const NEXT = "next";
  const SECONDS_TO_PREV = 10;
  const SECONDS_TO_NEXT = 10;
  const VIDEO_START_TIME = 0;

  video_len = convertToSeconds(video_len);
  pos = convertToSeconds(pos);
  op_start = convertToSeconds(op_start);
  op_end = convertToSeconds(op_end);

  if (isInOpening(pos, op_start, op_end)) pos = op_end;

  for (const command of commands) {
    if (command === PREV)
      pos = Math.max(pos - SECONDS_TO_PREV, VIDEO_START_TIME);
    else pos = Math.min(pos + SECONDS_TO_NEXT, video_len);

    if (isInOpening(pos, op_start, op_end)) pos = op_end;
    console.log(pos);
  }

  return convertSecondsToMMSS(pos);
}

function convertToSeconds(time) {
  const SEC_IN_MIN = 60;
  const [min, sec] = time.split(":");

  return Number(min) * SEC_IN_MIN + Number(sec);
}

function convertSecondsToMMSS(seconds) {
  const SEC_IN_MIN = 60;
  const min = Math.floor(seconds / SEC_IN_MIN)
    .toString()
    .padStart(2, "0");
  const sec = (seconds % SEC_IN_MIN).toString().padStart(2, "0");

  return `${min}:${sec}`;
}

function isInOpening(pos, openingStart, openingEnd) {
  return openingStart <= pos && pos <= openingEnd;
}
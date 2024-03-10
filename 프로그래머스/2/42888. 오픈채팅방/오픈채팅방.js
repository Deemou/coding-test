function solution(record) {
  const answer = [];
  const nicknameMap = {};
  const ENTER = "Enter";
  const LEAVE = "Leave";

  for (let i = 0; i < record.length; i++) {
    const [status, uid, nickname] = record[i].split(" ");

    if (status === LEAVE) continue;
    nicknameMap[uid] = nickname;
  }

  for (let i = 0; i < record.length; i++) {
    const [status, uid, nickname] = record[i].split(" ");

    if (status === ENTER) {
      answer.push(nicknameMap[uid] + "님이 들어왔습니다.");
    } else if (status === LEAVE) {
      answer.push(nicknameMap[uid] + "님이 나갔습니다.");
    }
  }

  return answer;
}
function solution(priorities, location) {
  let answer = 0;

  while (true) {
    const doc = priorities.shift();
    if (isTopPriority(doc, priorities)) {
      answer++;
      if (location === 0) return answer;
    } else priorities.push(doc);
    location === 0 ? (location = priorities.length - 1) : location--;
  }
}

function isTopPriority(doc, priorities) {
  for (let i = 0; i < priorities.length; i++) {
    if (doc < priorities[i]) {
      return false;
    }
  }
  return true;
}
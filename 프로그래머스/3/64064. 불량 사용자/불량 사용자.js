function solution(user_id, banned_id) {
  const bannedSet = new Set();
  const selected = [];

  dfs(0);

  return bannedSet.size;

  function dfs(depth) {
    if (depth === banned_id.length) {
      bannedSet.add([...selected].sort().toString());
      return;
    }

    for (let i = 0; i < user_id.length; i++) {
      if (selected.includes(user_id[i])) continue;
      if (!checkMatch(user_id[i], banned_id[depth])) continue;

      selected.push(user_id[i]);
      dfs(depth + 1);
      selected.pop();
    }
  }

  function checkMatch(user, ban) {
    if (user.length !== ban.length) return false;
    for (let i = 0; i < user.length; i++) {
      if (ban[i] !== "*" && user[i] !== ban[i]) return false;
    }

    return true;
  }
}

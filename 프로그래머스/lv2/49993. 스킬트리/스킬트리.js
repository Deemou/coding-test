function solution(skill, skill_trees) {
  let answer = 0;
  for (let skill_tree of skill_trees) {
    const str = `[${skill}]`;
    const regex = new RegExp(str, 'g');
    const matched = skill_tree.match(regex);
    if (matched === null) {
      answer++;
      continue;
    }
    const arr = matched.join('');
    if (skill.startsWith(arr)) answer++;
  }
  return answer;
}
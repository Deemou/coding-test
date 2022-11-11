function solution(array, commands) {
  return commands.reduce((answer, command) => {
    const startIndex = command[0] - 1;
    const endIndex = command[1];
    const k = command[2] - 1;
    const kthNum = array.slice(startIndex, endIndex).sort((a, b) => a - b)[k];
    answer.push(kthNum);
    return answer;
  }, []);
}

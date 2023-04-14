function solution(n, computers) {
  let answer = 0;
  const visit = new Array(n).fill(false);
  const queue = [];

  for (let i = 0; i < n; i++) {
    if (visit[i] === true) continue;
      
    answer++;
    visit[i] = true;
    queue.push(i);
      
    while (queue.length > 0) {
      const current = queue.shift();
        
      for (let next = 0; next < n; next++) {
        if (next === current) continue;
        if (computers[current][next] === 0) continue;
        if (visit[next] === true) continue;
          
        visit[next] = true;
        queue.push(next);
      }
    }
  }
    
  return answer;
}
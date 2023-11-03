function solution(tickets) {
    const answer = [];
    const path = ["ICN"];
    const visited = Array(tickets.length).fill(false);
    
    dfs("ICN", 0);
    return answer.sort()[0];
    
    function dfs(location, dist) {
        if(dist===tickets.length) {
            answer.push([...path])
            return;
        }
        
        for(let i=0; i<tickets.length; i++){
            if(visited[i]) continue;
            const [from, to] = tickets[i];
            if(from!==location) continue;
            
            visited[i] = true;
            path.push(to);
            dfs(to, dist+1);
            path.pop();
            visited[i] = false;
        }
    }
}
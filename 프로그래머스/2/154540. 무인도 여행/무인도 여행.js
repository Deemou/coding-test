function solution(maps) {
    const answer = [];
    const H = maps.length;
    const W = maps[0].length;
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    const visited = Array.from({length: H}, () => Array(W).fill(false));
    
    for(let i = 0; i < H; i++) {
        for(let j = 0; j < W; j++) {
            if(maps[i][j] === 'X') continue;
            if(visited[i][j]) continue;
            
            visited[i][j] = true;
            answer.push(dfs(i, j));
        }
    }
    
    return answer.length ? answer.sort((a, b) => a - b) : [-1];
    
    function dfs(x, y) {
        let supplies = +maps[x][y];
    
        for(let dir = 0; dir < 4; dir++) {
            const nx = x + dx[dir];
            const ny = y + dy[dir];
        
            if(nx < 0 || ny < 0 || nx >= H || ny>= W) continue;
            if(maps[nx][ny] === 'X') continue;
            if(visited[nx][ny]) continue;
            
            visited[nx][ny] = true;
            supplies += dfs(nx, ny)
        }
    
        return supplies;
    }
}
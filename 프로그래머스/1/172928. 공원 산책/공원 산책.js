function solution(park, routes) {
    const dx = { 'E': 0, 'W': 0, 'N': -1, 'S': 1 };
    const dy = { 'E': 1, 'W': -1, 'N': 0, 'S': 0 };
    let x = 0, y = 0;
    const H = park.length;
    const W = park[0].length;
    
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            if (park[i][j] === 'S') {
                x = i;
                y = j;
            }
        }
    }

    for (let route of routes) {
        const [dir, dist] = route.split(' ');
        let nx = x;
        let ny = y;
        let isInvalid = false;
        
        for (let i = 0; i < +dist; i++) {
            nx += dx[dir];
            ny += dy[dir];
            if(nx < 0 || ny < 0 || nx >= H || ny >= W || park[nx][ny] === 'X') {
                isInvalid = true;
                break;
            }
        }
        
        if(isInvalid) continue;
        x = nx;
        y = ny;
    }
    
    return [x, y];
}

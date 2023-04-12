function solution(dirs) {
    //1.좌표 2배. 좌하단(0,0), 우상단(20,20)으로 옮기기
    //2.방문한 위치 표시
    //3.새로 방문한 곳이면 카운터 증가
    let count = 0;
    let current = [10,10];
    const min = 0, max=2*10;
    const location = {'L':[-1,0], 'R':[1,0], 'U':[0,1],'D':[0,-1]};
    const visit = Array(max+1).fill().map(()=>Array(max+1).fill(false));
    
    for(let i=0; i<dirs.length; i++){
        const [currentX, currentY] = [...current];
        const addingX = location[dirs[i]][0], addingY = location[dirs[i]][1];
        let newX = currentX + addingX*2, newY = currentY + addingY*2;
        if(newX < min | newX > max | newY < min | newY > max) continue;
        if(visit[newX-addingX][newY-addingY]===false) {
            visit[newX-addingX][newY-addingY]=true;
            count++;
        }
        current = [newX,newY];
    }
    return count;
}
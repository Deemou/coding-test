function solution(N, roads, K) {
    const distances = Array(N+1).fill(Infinity);
    const roadmap = Array(N+1).fill().map(()=>[])
    for(let [a, b, distance] of roads) {
        roadmap[a].push([b, distance]);
        roadmap[b].push([a, distance])
    }
    
    const queue = [[1,0]]
    while(queue.length > 0){
        const [current, time] = queue.shift();
        
        if(distances[current] <= time) continue;
        distances[current] = time;
        
        for(let [next, distance] of roadmap[current]){
            queue.push([next, distance + time])
        }
    }
    
    return distances.filter(x=> x <= K).length;
}
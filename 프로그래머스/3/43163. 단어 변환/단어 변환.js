function solution(begin, target, words) {
    let answer = Infinity;
    const visited = Array(words.length).fill(false);
    
    dfs(begin, 0)
    
    return answer===Infinity ? 0 : answer;
    
    function dfs(cur, cnt) {
        if(cur === target) {
            answer = Math.min(answer, cnt);
            return
        }
        
        for(let i=0; i<words.length; i++){
            if(visited[i]) continue;
            
            const word = words[i];
            let diffCnt = 0;
            for(let j=0; j<word.length; j++){
                if(cur[j] !== word[j]) diffCnt++;
            }
            if(diffCnt !== 1) continue;
            
            visited[i] = true;
            dfs(word, cnt+1);
            visited[i] = false;
        }
    }
}
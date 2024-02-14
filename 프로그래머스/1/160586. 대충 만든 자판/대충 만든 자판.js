function solution(keymap, targets) {
    const answer = [];
    const map = new Map();
    
    for(let i=0; i<keymap.length; i++) {
        for(let j=0; j<keymap[i].length; j++) {
            const char = keymap[i][j];
            const cnt = map.get(char) || Infinity;
            map.set(char, Math.min(cnt, j+1));
        }
    }
    
    for(let i=0; i<targets.length; i++) {
        let totalCnt = 0;
        let isInvalid = false;
        
        for(let j=0; j<targets[i].length; j++) {
            const char = targets[i][j];
            if(!map.has(char)) {
                isInvalid = true;
                break;
            }
            const cnt = map.get(char);
            totalCnt += cnt;
        }
        answer.push(isInvalid? -1:totalCnt);
    }
    
    return answer;
}
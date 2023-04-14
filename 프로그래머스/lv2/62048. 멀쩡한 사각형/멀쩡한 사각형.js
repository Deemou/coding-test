function solution(w, h) {
    if (w === h) return w * h - w;
    
    let sum = 0;
    
    for(let i = 1; i < w; i++){
        sum += Math.floor(i * h / w)
    }
    return sum * 2;
}
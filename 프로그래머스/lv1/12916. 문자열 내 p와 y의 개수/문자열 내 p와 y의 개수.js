function solution(s){
    const arr = s.split("");
    let pCount = 0, yCount = 0;
    arr.forEach(char => {
        if(/[pP]/.test(char)) pCount += 1
        else if(/[yY]/.test(char)) yCount += 1
    })
    if(pCount==yCount) return true
    return false
}
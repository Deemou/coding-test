function solution(s) {
    const numArr = s.split("").filter(item => !isNaN(item)).join("")
    const num = Number(numArr)
    if(s.at(0)=='-') return -num
    return num
}
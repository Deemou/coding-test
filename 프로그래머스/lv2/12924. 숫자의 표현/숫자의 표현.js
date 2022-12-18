function solution(n) {
    let rest = n
    let numberOfContiniousNumbers=1;
    let answer = 0;
    while(rest>0){
        if(rest%numberOfContiniousNumbers===0)
            answer++
        rest-=numberOfContiniousNumbers
        numberOfContiniousNumbers++
    }
    return answer;
}
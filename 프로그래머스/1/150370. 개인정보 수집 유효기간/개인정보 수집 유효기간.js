function solution(today, terms, privacies) {
    const todayToDays = convertDateToDays(today)
    const answer = [];
    const termDays = terms.reduce((acc, cur)=>{
        const [code, period] = cur.split(" ");
        acc[code] = Number(period) * 28;
        
        return acc;
    }, {})
    
    for(let i=0; i<privacies.length; i++) {
        const [dateStr, code] = privacies[i].split(" ");
        const dateToDays = convertDateToDays(dateStr) + termDays[code];
        
        if(todayToDays >= dateToDays) answer.push(i+1);
    }
    
    return answer;
}
    
function convertDateToDays(date) {
    const [year, month, day] = date.split(".").map(Number);
    const dateToDays = (year * 12 + month - 1) * 28 + day;
    
    return dateToDays;
}

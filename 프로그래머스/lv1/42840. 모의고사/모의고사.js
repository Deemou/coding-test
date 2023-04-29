function solution(answers) {
    const answer = [];
    const pattern1 = [1, 2, 3, 4, 5];
    const pattern2 = [2, 1, 2, 3, 2, 4, 2, 5];
    const pattern3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    const count = [0, 0, 0];

    for(let i in answers) {
        if(answers[i] == pattern1[i % pattern1.length]) count[0]++;
        if(answers[i] == pattern2[i % pattern2.length]) count[1]++;
        if(answers[i] == pattern3[i % pattern3.length]) count[2]++;
    }

    const max = Math.max(...count);
    for(let i = 0; i < count.length; i++) {
        if(max == count[i]) answer.push(i + 1);
    }

    return answer;
}
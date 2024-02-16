function solution(weights) {
    const weightCount = {};
    for (let weight of weights) {
        if (weight in weightCount) weightCount[weight]++;
        else weightCount[weight] = 1;
    }

    let pairs = 0;
    for (let w1 in weightCount) {
        for (let w2 in weightCount) {
            if (2 * w1 === 3 * w2 || 2 * w1 === 4 * w2 || 3 * w1 === 4 * w2) {
                pairs += weightCount[w1] * weightCount[w2];
            } else if(w1 === w2) {
                for(let i=1; i<weightCount[w1]; i++) {
                    pairs += i;
                }
            }
        }
    }

    return pairs;
}

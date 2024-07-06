function solution(s) {
    let minLength = s.length;

    for (let step = 1; step <= Math.floor(s.length / 2); step++) {
        let compressed = '';
        let prev = s.slice(0, step);
        let cnt = 1;

        for (let j = step; j < s.length; j += step) {
            const current = s.slice(j, j + step);

            if (prev === current) {
                cnt++;
            } else {
                compressed += (cnt > 1 ? cnt : '') + prev;
                prev = current;
                cnt = 1;
            }
        }

        compressed += (cnt > 1 ? cnt : '') + prev;
        minLength = Math.min(minLength, compressed.length);
    }

    return minLength;
}
function solution(m, n, board) {
    board = board.map(v => v.split(""));

    function findBlocks() {
        const toBeRemoved = new Set();
        for (let i = 0; i < m - 1; i++) {
            for (let j = 0; j < n - 1; j++) {
                const block = board[i][j];
                if (block && block === board[i][j + 1] && block === board[i + 1][j] && block === board[i + 1][j + 1]) {
                    toBeRemoved.add(`${i},${j}`);
                    toBeRemoved.add(`${i},${j + 1}`);
                    toBeRemoved.add(`${i + 1},${j}`);
                    toBeRemoved.add(`${i + 1},${j + 1}`);
                }
            }
        }
        return Array.from(toBeRemoved).map(v => v.split(',').map(Number));
    }

    function removeBlocks(toBeRemoved) {
        let removedCnt = 0;
        toBeRemoved.forEach(([i, j]) => {
            if (board[i][j] !== 0) {
                removedCnt++;
                board[i][j] = 0;
            }
        });

        return removedCnt;
    }

    function dropBlocks() {
        for (let j = 0; j < n; j++) {
            let emptyRow = m - 1;
            for (let i = m - 1; i >= 0; i--) {
                if (board[i][j] !== 0) {
                    [board[emptyRow][j], board[i][j]] = [board[i][j], board[emptyRow][j]];
                    emptyRow--;
                }
            }
        }
    }

    let answer = 0;
    while (true) {
        const toBeRemoved = findBlocks();
        if (!toBeRemoved.length) break;
        answer += removeBlocks(toBeRemoved);
        dropBlocks();
    }

    return answer;
}

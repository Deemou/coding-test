import sys


def input():
    return sys.stdin.readline().rstrip()


def solution():
    board = [list(map(int, input().split())) for _ in range(5)]
    numbers = [list(map(int, input().split())) for _ in range(5)]
    number_dict = {board[i][j]: (i, j) for i in range(5) for j in range(5)}

    def check_bingo():
        bingo = 0
        # 가로, 세로
        for i in range(5):
            if all(board[i][j] == 0 for j in range(5)):
                bingo += 1
            if all(board[j][i] == 0 for j in range(5)):
                bingo += 1
        # 대각선
        if all(board[i][i] == 0 for i in range(5)):
            bingo += 1
        if all(board[i][4 - i] == 0 for i in range(5)):
            bingo += 1
        return bingo

    cnt = 0

    for i in range(5):
        for j in range(5):
            cnt += 1
            x, y = number_dict[numbers[i][j]]
            board[x][y] = 0

            if check_bingo() >= 3:
                return cnt


print(solution())

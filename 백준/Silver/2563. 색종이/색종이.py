import sys


def input():
    return sys.stdin.readline().rstrip()


def solution():
    board = [[0 for _ in range(100)] for _ in range(100)]
    n = int(input())

    for _ in range(n):
        x, y = map(int, input().split())

        for i in range(x, x + 10):
            for j in range(y, y + 10):
                board[i][j] = 1

    return sum(sum(row) for row in board)


print(solution())

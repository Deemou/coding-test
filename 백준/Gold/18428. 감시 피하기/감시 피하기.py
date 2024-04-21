import sys
from itertools import combinations


def input():
    return sys.stdin.readline().rstrip()


def solution():
    N = int(input())
    board = [input().split() for _ in range(N)]

    teachers = [(i, j) for i in range(N) for j in range(N) if board[i][j] == "T"]
    empty_spaces = [(i, j) for i in range(N) for j in range(N) if board[i][j] == "X"]

    def is_watched():
        dx = [-1, 1, 0, 0]
        dy = [0, 0, -1, 1]

        for sx, sy in teachers:
            for dir in range(4):
                x, y = sx, sy
                while 0 <= x < N and 0 <= y < N:
                    if board[x][y] == "S":
                        return True
                    if board[x][y] == "O":
                        break
                    x += dx[dir]
                    y += dy[dir]

        return False

    for obstacles in combinations(empty_spaces, 3):
        for row, col in obstacles:
            board[row][col] = "O"

            if not is_watched():
                return "YES"

        for row, col in obstacles:
            board[row][col] = "X"

    return "NO"


print(solution())

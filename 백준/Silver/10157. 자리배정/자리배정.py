import sys


def input():
    return sys.stdin.readline().rstrip()


def solution():
    C, R = map(int, input().split())
    K = int(input())

    if K > C * R:
        return 0

    seats = [[0] * R for _ in range(C)]
    dx = [0, 1, 0, -1]
    dy = [1, 0, -1, 0]
    direction = 0
    x, y = 0, 0

    for n in range(1, K):
        seats[x][y] = n
        nx = x + dx[direction]
        ny = y + dy[direction]

        if nx < 0 or nx >= C or ny < 0 or ny >= R or seats[nx][ny]:
            direction = (direction + 1) % 4
            nx = x + dx[direction]
            ny = y + dy[direction]

        x, y = nx, ny

    return f"{x + 1} {y + 1}"


print(solution())

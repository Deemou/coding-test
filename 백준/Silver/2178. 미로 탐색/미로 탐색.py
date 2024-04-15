import sys
from collections import deque


def input():
    return sys.stdin.readline().rstrip()


def solution():
    N, M = map(int, input().split())
    board = [list(map(int, input())) for _ in range(N)]
    dist = [[1 for _ in range(M)] for _ in range(N)]
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]

    def bfs():
        queue = deque()
        queue.append((0, 0))

        while queue:
            x, y = queue.popleft()

            for i in range(4):
                nx = x + dx[i]
                ny = y + dy[i]

                if nx < 0 or nx >= N or ny < 0 or ny >= M:
                    continue
                if board[nx][ny] == 0:
                    continue
                if dist[nx][ny] != 1:
                    continue

                board[nx][ny] = True
                dist[nx][ny] = dist[x][y] + 1
                queue.append((nx, ny))

        return

    bfs()

    return dist[N - 1][M - 1]


print(solution())

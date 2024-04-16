import sys
from collections import deque


def input():
    return sys.stdin.readline().rstrip()


def solution():
    N, K = map(int, input().split())
    max_range = 100001
    visited = [0] * max_range

    def bfs(start):
        queue = deque()
        queue.append((start))
        visited[start] = 1

        while queue:
            x = queue.popleft()

            if x == K:
                return visited[x] - 1

            for nx in (x - 1, x + 1, x * 2):
                if nx < 0 or nx >= max_range:
                    continue
                if visited[nx]:
                    continue
                visited[nx] = visited[x] + 1
                queue.append(nx)

        return

    return bfs(N)


print(solution())

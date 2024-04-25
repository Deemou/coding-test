import sys


def input():
    return sys.stdin.readline().rstrip()


def solution():
    N = int(input())
    answer = 0
    stack = []

    for _ in range(N):
        data = list(map(int, input().split()))

        if data[0]:
            stack.append(data[1:])

        if stack:
            stack[-1][1] -= 1  # 남은 시간 감소

            if stack[-1][1] == 0:
                answer += stack.pop()[0]  # 점수 추가

    return answer


print(solution())

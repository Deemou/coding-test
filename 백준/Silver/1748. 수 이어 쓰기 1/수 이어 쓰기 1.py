import sys


def input():
    return sys.stdin.readline().rstrip()


def solution():
    N = int(input())
    answer = 0
    digits = 1
    start = 1

    while start <= N:
        end = min(start * 10 - 1, N)
        answer += digits * (end - start + 1)
        digits += 1
        start *= 10

    return answer


print(solution())

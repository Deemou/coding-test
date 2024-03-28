def solution():
    N, M = map(int, input().split())
    S = set(input() for _ in range(N))
    checks = [input() for _ in range(M)]
    answer = 0

    for check in checks:
        if check in S:
            answer += 1

    return answer

print(solution())
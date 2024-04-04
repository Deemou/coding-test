def solution():
    n = int(input())
    assignments = []

    for _ in range(n):
        d, w = map(int, input().split())
        assignments.append((d, w))
    assignments.sort(key=lambda x: -x[1])

    days = [0] * 1000

    for d, w in assignments:
        for day in range(d-1, -1, -1):
            if days[day] == 0:
                days[day] = w
                break
    
    return sum(days)

print(solution())
import sys

def solution():
    N, M, B = map(int, sys.stdin.readline().rstrip().split())
    ground = [list(map(int, sys.stdin.readline().rstrip().split())) for _ in range(N)]
    max_height = 0
    min_height = 256
    height_counts = [0] * 257

    for row in ground:
        for height in row:
            height_counts[height] += 1
            max_height = max(max_height, height)
            min_height = min(min_height, height)

    min_time = float('inf')
    target_height = 0

    for h in range(min_height, max_height + 1):
        time = 0
        inventory = B

        for i in range(min_height, max_height + 1):
            if i < h:
                time += (h - i) * height_counts[i] 
                inventory -= (h - i) * height_counts[i]
            elif i > h:
                time += 2 * (i - h) * height_counts[i]
                inventory += (i - h) * height_counts[i]

        if inventory >= 0 and time <= min_time:
            min_time = time
            target_height = h
    
    return f'{min_time} {target_height}'

print(solution())
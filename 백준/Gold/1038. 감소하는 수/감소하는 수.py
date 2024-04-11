from collections import deque

def solution():
    N = int(input())

    if N < 10:
        return N

    queue = deque(range(1, 10))
    cnt = 9

    while queue:
        num = queue.popleft()
        last_digit = num % 10
        
        for i in range(last_digit):
            new_num = num * 10 + i
            queue.append(new_num)
            cnt += 1
            
            if cnt == N:
                return new_num

    return -1


print(solution())
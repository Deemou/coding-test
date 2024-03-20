def solution(a, b):
    min_num = min(a, b)
    max_num = max(a, b)
    return sum(i for i in range(min_num, max_num+1))
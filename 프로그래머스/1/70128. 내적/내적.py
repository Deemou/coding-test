def solution(a, b):
    result = sum(x*y for x, y in zip(a, b))
    return result
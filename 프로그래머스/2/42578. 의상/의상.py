from collections import Counter
from functools import reduce

def solution(clothes):
    count_by_type = Counter([type for _, type in clothes])
    
    # 각 종류별로 선택할 수 있는 옵션의 수(해당 종류의 의상 수 + 1)
    # 모든 종류에 대해 이 옵션의 수를 곱하기
    # 아무것도 입지 않는 경우 빼기 - 1
    answer = reduce(lambda acc, x: acc * (x + 1), count_by_type.values(), 1) - 1
    
    return answer

def solution(n):
    x = n
    # 1. 가장 낮은 '1'비트 찾기
    right_one = x & -x
    # 2. 가장 낮은 '1'비트에 1 더하기
    added_one_bit = x + right_one
    # 3. 변경된 비트 패턴 찾기
    modified_pattern = x ^ added_one_bit
    # 4. 변경된 비트 패턴 조정하기
    # 4-1. 오른쪽 끝으로 시프트하기
    adjusted_pattern = (modified_pattern) // right_one 
    # 4-2. 오른쪽으로 2비트 시프트하기
    adjusted_pattern >>= 2
    # 5. 최종 결과 구하기
    next_n = added_one_bit | adjusted_pattern
    
    return next_n
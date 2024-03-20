def solution(n):
    # 1. n을 3진법으로 변환
    ternary = ''
    while n > 0:
        n, remainder = divmod(n, 3)
        ternary = str(remainder) + ternary

    # 2. 3진법으로 변환한 결과를 뒤집음
    reversed_ternary = ternary[::-1]

    # 3. 뒤집은 3진법을 다시 10진법으로 변환
    return int(reversed_ternary, 3)

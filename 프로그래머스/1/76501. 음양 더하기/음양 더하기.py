def solution(absolutes, signs):
    total_sum = 0
    for absolute, sign in zip(absolutes, signs):
        if sign:
            total_sum += absolute
        else:
            total_sum -= absolute
    return total_sum

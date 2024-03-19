def solution(x):
    digit_sum = sum(int(digit) for digit in str(x))
    return x % digit_sum == 0
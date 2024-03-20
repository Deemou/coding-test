def solution(numbers):
    full_set = set(range(10))
    numbers_set = set(numbers)
    missing_numbers = full_set - numbers_set
    answer = sum(missing_numbers)
    return answer

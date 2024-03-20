def solution(arr):
    min_num = min(arr)
    arr.remove(min_num)
    return arr if arr else [-1]
import sys


def input():
    return sys.stdin.readline().rstrip()


def solution():
    N = int(input())
    char_val = {}
    answer = 0

    for _ in range(N):
        s = input()
        reversed_s = s[::-1]
        val = 1

        for char in reversed_s:
            if char in char_val:
                char_val[char] += val
            else:
                char_val[char] = val
            val *= 10

    sorted_items_desc = sorted(char_val.items(), key=lambda item: item[1], reverse=True)
    val = 9

    for item in sorted_items_desc:
        answer += item[1] * val
        val -= 1

    return answer


print(solution())

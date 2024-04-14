import sys


def input():
    return sys.stdin.readline().rstrip()


def solution():
    H, W = map(int, input().split())
    blocks = list(map(int, input().split()))

    left_max = [0] * W
    right_max = [0] * W
    water = 0

    max_height_left = blocks[0]
    max_height_right = blocks[W - 1]

    for i in range(W):
        max_height_left = max(max_height_left, blocks[i])
        left_max[i] = max_height_left

    for i in range(W - 1, -1, -1):
        max_height_right = max(max_height_right, blocks[i])
        right_max[i] = max_height_right

    for i in range(W):
        water += min(left_max[i], right_max[i]) - blocks[i]

    return water


print(solution())

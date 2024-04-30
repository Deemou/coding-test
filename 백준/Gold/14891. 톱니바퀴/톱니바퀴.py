import sys


def input():
    return sys.stdin.readline().rstrip()


def solution():
    gears = [input() for _ in range(4)]

    def rotate(gear, direction):
        if direction == 1:  # 시계 방향
            return gear[-1] + gear[:-1]
        else:  # 반시계 방향
            return gear[1:] + gear[0]

    def can_rotate(a, b):
        return a[2] != b[6]

    K = int(input())

    for _ in range(K):
        num, direction = map(int, input().split())
        num -= 1

        # 각 톱니바퀴의 회전 여부와 방향 저장
        rotations = [0] * 4
        rotations[num] = direction

        # 현재 톱니바퀴로부터 왼쪽 톱니바퀴 회전 여부 결정
        for i in range(num - 1, -1, -1):
            if can_rotate(gears[i], gears[i + 1]):
                rotations[i] = -rotations[i + 1]
            else:
                break

        # 현재 톱니바퀴로부터 오른쪽 톱니바퀴 회전 여부 결정
        for i in range(num + 1, 4):
            if can_rotate(gears[i - 1], gears[i]):
                rotations[i] = -rotations[i - 1]
            else:
                break

        # 결정된 회전 방향대로 톱니바퀴 회전
        for i in range(4):
            if rotations[i] != 0:
                gears[i] = rotate(gears[i], rotations[i])

    # 점수 계산
    score = sum((int(gears[i][0]) << i) for i in range(4))

    return score


print(solution())

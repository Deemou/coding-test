def solution(people, limit):
    # 사람들의 몸무게를 오름차순으로 정렬합니다.
    people.sort()
    # 구명보트의 수를 세는 변수입니다.
    boats = 0
    # 가장 가벼운 사람의 인덱스
    left = 0
    # 가장 무거운 사람의 인덱스
    right = len(people) - 1

    while left <= right:
        # 가장 무거운 사람과 가장 가벼운 사람의 무게 합이 무게 제한을 초과하지 않는 경우
        if people[left] + people[right] <= limit:
            # 두 사람을 함께 태웁니다.
            left += 1
        # 가장 무거운 사람을 보트에 태웁니다.
        right -= 1
        # 사용한 보트의 수를 증가시킵니다.
        boats += 1

    return boats

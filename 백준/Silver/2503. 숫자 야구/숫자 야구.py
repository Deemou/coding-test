from itertools import permutations

def check(guess, target, strike, ball):
    strike_count = ball_count = 0

    for i in range(3):
        if guess[i] == target[i]:
            strike_count += 1
        elif guess[i] in target:
            ball_count += 1
    
    return strike_count == strike and ball_count == ball

def solution(hints):
    count = 0

    for comb in permutations([str(i) for i in range(1, 10)], 3):
        if all(check(comb, str(guess), strike, ball) for guess, strike, ball in hints):
            count += 1

    return count

n = int(input())
hints = [list(map(int, input().split())) for _ in range(n)]

print(solution(hints))
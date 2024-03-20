def solution(d, budget):
    d.sort()
    cnt = 0
    
    for amount in d:
        if budget >= amount:
            budget -= amount
            cnt += 1
        else:
            break
    
    return cnt

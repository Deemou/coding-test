def solution(queue1, queue2):
    sum1, sum2 = sum(queue1), sum(queue2)
    target = (sum1 + sum2) // 2
    
    if (sum1 + sum2) % 2 != 0:
        return -1
    
    combined = queue1 + queue2
    start, end = 0, len(queue1)
    cnt = 0
    
    while start < len(combined) and end <= len(combined):
        if sum1 == target:
            return cnt
        
        if sum1 < target and end < len(combined):
            sum1 += combined[end]
            end += 1
        else:
            sum1 -= combined[start]
            start += 1
        cnt += 1
            
    return -1

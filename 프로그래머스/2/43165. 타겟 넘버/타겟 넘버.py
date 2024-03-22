def solution(numbers, target):
    answer = 0
    
    def dfs(idx, val):
        nonlocal answer
        
        if idx == len(numbers):
            if val == target:
                answer += 1
            return
        dfs(idx+1, val+numbers[idx])
        dfs(idx+1, val-numbers[idx])
    
    dfs(0,0)
    
    return answer




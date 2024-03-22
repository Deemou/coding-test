def solution(n, computers):
    answer = 0
    visited = [False] * n
    
    def dfs(cur):
        for next in range(len(computers)):
            if not computers[cur][next]:
                continue
            if visited[next]:
                continue
                
            visited[next] = True
            dfs(next)
    
    for i in range(n):
        if visited[i]:
            continue
            
        visited[i] = True
        dfs(i)
        answer += 1
            
    return answer

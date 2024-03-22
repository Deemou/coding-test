from collections import deque

def solution(maps):   
    def bfs():
        n = len(maps)
        m = len(maps[0])
        visited = [[False] * m for _ in range(n)]
        dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]]
        queue = deque([(0, 0, 1)])
        
        while queue:
            x, y, dist = queue.popleft()
            
            if x == n-1 and y == m-1:
                return dist
            
            for dx, dy in dirs:
                nx = x + dx
                ny = y + dy
                
                if nx >= n or nx < 0 or ny >= m or ny < 0:
                    continue
                if maps[nx][ny] == 0:
                    continue
                if visited[nx][ny]:
                    continue
                
                visited[nx][ny] = True
                queue.append((nx, ny, dist+1))
        
        return -1
        
    return bfs()
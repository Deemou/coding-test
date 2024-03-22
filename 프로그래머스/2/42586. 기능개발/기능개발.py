import math

def solution(progresses, speeds):
    answer = []
    time = math.ceil((100 - progresses[0]) / speeds[0])
    deployed_tasks = 0
    
    for progress, speed in zip(progresses, speeds):
        current_progress = progress + speed * time
        
        if current_progress >= 100:
            deployed_tasks += 1
        else:
            time += math.ceil((100 - current_progress) / speed)
            answer.append(deployed_tasks)
            deployed_tasks = 1
    
    if deployed_tasks:
        answer.append(deployed_tasks)
    
    return answer
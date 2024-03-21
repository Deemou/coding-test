def solution(name, yearning, photo):
    yearning_dict = {n : y for n, y in zip(name, yearning)}
    result = []
    
    for p in photo:
        score = 0
        
        for person in p:
            score += yearning_dict.get(person, 0)
            
        result.append(score)
    
    return result

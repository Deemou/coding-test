from collections import Counter
    
def solution(k, tangerine):
    count = Counter(tangerine)
    count_sorted = sorted(count.values(), reverse=True)
    sum_count = 0
    
    for i, c in enumerate(count_sorted):
        sum_count += c
        
        if sum_count >= k:
            return i + 1

    return len(count_sorted)

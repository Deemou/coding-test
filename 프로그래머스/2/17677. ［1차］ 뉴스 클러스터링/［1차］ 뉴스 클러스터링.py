from collections import Counter

def make_multiset(s):
    multiset = []
    
    for i in range(len(s) - 1):
        element = s[i:i+2].lower()
        
        if element.isalpha():
            multiset.append(element)
            
    return multiset

def solution(str1, str2):

    multiset1 = Counter(make_multiset(str1))
    multiset2 = Counter(make_multiset(str2))

    intersection = multiset1 & multiset2
    union = multiset1 | multiset2
    
    intersection_size = sum(intersection.values())
    union_size = sum(union.values())
    
    if union_size == 0:
        jaccard = 1
    else:
        jaccard = intersection_size / union_size
    
    return int(jaccard * 65536)

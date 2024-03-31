def solution():
    s = input()
    answer = ''
    word = ''
    in_bracket = False

    for char in s:
        if char == '<':
            in_bracket = True
            answer += word[::-1]
            word = ''
            answer += char
        elif char == '>':
            in_bracket = False
            answer += char
        elif in_bracket:
            answer += char
        else:
            if char == ' ':
                answer += word[::-1] + char
                word = ''
            else:
                word += char

    answer += word[::-1]
    
    return answer

print(solution())
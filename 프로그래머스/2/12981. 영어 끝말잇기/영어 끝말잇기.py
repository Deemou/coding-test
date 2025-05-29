def solution(n, words):
    used = set()
    last_char = words[0][0]

    for i, word in enumerate(words):
        if last_char != word[0] or word in used:
            return [i % n + 1, i // n + 1]
        used.add(word)
        last_char = word[-1]

    return [0, 0]
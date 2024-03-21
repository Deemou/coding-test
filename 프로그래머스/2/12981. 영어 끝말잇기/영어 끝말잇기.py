def solution(n, words):
    used_words = set()
    last_char = words[0][0]

    for i, word in enumerate(words):
        if word in used_words or last_char != word[0]:
            return [(i % n) + 1, (i // n) + 1]
        used_words.add(word)
        last_char = word[-1]

    return [0, 0]

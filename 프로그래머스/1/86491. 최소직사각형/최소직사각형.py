def solution(sizes):
    adjusted_sizes = [sorted(size, reverse=True) for size in sizes]

    max_width = max(size[0] for size in adjusted_sizes)
    max_height = max(size[1] for size in adjusted_sizes)

    return max_width * max_height
